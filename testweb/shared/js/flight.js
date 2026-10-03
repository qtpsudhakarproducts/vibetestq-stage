/**
 * Flight Booking Logic - Mock API Driven
 */

class FlightApp {
    constructor() {
        this.api = new MockAPI('tamash_flight_store', {
            flights: [
                { id: 'SK-101', airline: 'SkyBlue', from: 'London', to: 'New York', price: 450, time: '10:00 AM' },
                { id: 'SK-202', airline: 'Pacific', from: 'London', to: 'New York', price: 520, time: '02:30 PM' },
                { id: 'SK-303', airline: 'EuroJet', from: 'Paris', to: 'Berlin', price: 95, time: '09:15 AM' }
            ],
            bookings: []
        });

        this.init();
    }

    async init() {
        this.setupTabs();
        this.renderFlights();

        const form = document.getElementById('passenger-form');
        if (form) {
            form.onsubmit = (e) => {
                e.preventDefault();
                this.confirmBooking();
            };
        }
    }

    setupTabs() {
        document.querySelectorAll('.nav-link[data-target]').forEach(link => {
            link.onclick = async (e) => {
                const target = e.currentTarget.dataset.target;
                document.querySelectorAll('.section-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

                document.getElementById(target).classList.add('active');
                e.currentTarget.classList.add('active');

                if (target === 'my-bookings') await this.renderMyBookings();
            };
        });
    }

    async searchFlights() {
        const from = document.getElementById('fromCity').value;
        const to = document.getElementById('toCity').value;

        Utils.showToast('Querying Global Distribution System...', 'info');
        await this.renderFlights({ from, to });
    }

    async renderFlights(filter = null) {
        const container = document.getElementById('flight-list');
        container.innerHTML = '<div style="text-align:center; padding: 2rem;"><i class="fas fa-spinner fa-spin"></i> Locating fares...</div>';

        let flights = await this.api.get('flights');

        if (filter) {
            flights = flights.filter(f =>
                f.from.toLowerCase().includes(filter.from.toLowerCase()) &&
                f.to.toLowerCase().includes(filter.to.toLowerCase())
            );
        }

        if (flights.length === 0) {
            container.innerHTML = '<div class="flight-card" style="text-align:center;">No flights found for this route.</div>';
            return;
        }

        container.innerHTML = flights.map(f => `
            <div class="flight-item">
                <div class="airline-info">
                    <div class="airline-logo">${f.airline.charAt(0)}</div>
                    <div>
                        <div style="font-weight: 700;">${f.airline} ${f.id}</div>
                        <div style="font-size: 0.8rem; color: #64748b;">${f.from} &rarr; ${f.to}</div>
                    </div>
                </div>
                <div style="text-align: center;">
                    <div style="font-weight: 700;">${f.time}</div>
                    <div style="font-size: 0.7rem; color: #64748b;">Non-stop</div>
                </div>
                <div style="text-align: right;">
                    <div class="price-tag">$${f.price}</div>
                    <button class="btn-portal" style="background: #0284c7; color: white; padding: 4px 12px; margin-top: 5px;" onclick="flightApp.prepBooking('${f.id}')">Select</button>
                </div>
            </div>
        `).join('');
    }

    async prepBooking(id) {
        const flights = await this.api.get('flights');
        const flight = flights.find(f => f.id === id);
        this.selectedFlight = flight;

        const details = document.getElementById('selected-flight-details');
        details.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <strong>${flight.airline}</strong>
                <span>$${flight.price}</span>
            </div>
            <div style="font-size: 0.8rem; margin-top: 5px;">${flight.from} to ${flight.to} | ${flight.time}</div>
        `;

        Utils.openModal('booking-modal');
    }

    async confirmBooking() {
        const payload = {
            flightId: this.selectedFlight.id,
            passenger: document.getElementById('passName').value,
            passport: document.getElementById('passID').value,
            bookedAt: new Date().toISOString()
        };

        await this.api.post('bookings', payload);
        Utils.closeModal('booking-modal');
        Utils.showToast('Booking Confirmed! E-Ticket sent.', 'success');
        document.getElementById('passenger-form').reset();
    }

    async renderMyBookings() {
        const container = document.getElementById('bookings-container');
        const bookings = await this.api.get('bookings');
        const flights = await this.api.get('flights');

        if (bookings.length === 0) {
            container.innerHTML = '<div class="flight-card" style="text-align:center; padding:3rem;">No active bookings.</div>';
            return;
        }

        container.innerHTML = bookings.map(b => {
            const f = flights.find(fl => fl.id === b.flightId) || { airline: 'Unknown', from: '?', to: '?', time: '?' };
            return `
                <div class="flight-card" style="border-left: 4px solid #10b981; margin-bottom: 1rem;">
                    <div style="display:flex; justify-content:space-between;">
                        <div>
                            <span style="font-size:0.7rem; color:#64748b; text-transform:uppercase;">Confirmed Trip</span>
                            <h4 style="margin: 5px 0;">${f.airline} &bull; ${f.from} &rarr; ${f.to}</h4>
                            <div style="font-size: 0.8rem;">Passenger: <strong>${b.passenger}</strong></div>
                        </div>
                        <div style="text-align:right;">
                            <div style="font-weight:700;">${f.time}</div>
                            <div style="font-size:0.7rem; color:#64748b;">PRN: ${b.id}</div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
}

window.flightApp = new FlightApp();
