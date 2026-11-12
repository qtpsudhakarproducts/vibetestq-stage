/**
 * SkyHook Airlines - Flight Reservation Application
 * Full end-to-end booking flow for Playwright test automation practice
 */

const FLIGHT_DATA = [
    // ---- New York <-> London ----
    { id: 'SK-101', airline: 'SkyHook', code: 'SK', from: 'New York', fromCode: 'JFK', to: 'London', toCode: 'LHR', dep: '08:00', arr: '20:00', duration: '7h 00m', stops: 0, price: 420, class: 'economy', seats: 32, badge: 'deal', amenities: ['wifi', 'meal', 'usb'] },
    { id: 'SK-102', airline: 'SkyHook', code: 'SK', from: 'New York', fromCode: 'JFK', to: 'London', toCode: 'LHR', dep: '14:30', arr: '02:30+1', duration: '7h 00m', stops: 0, price: 510, class: 'economy', seats: 18, badge: null, amenities: ['wifi', 'meal'] },
    { id: 'PA-201', airline: 'Pacific Air', code: 'PA', from: 'New York', fromCode: 'JFK', to: 'London', toCode: 'LHR', dep: '11:00', arr: '23:30', duration: '7h 30m', stops: 0, price: 389, class: 'economy', seats: 45, badge: 'popular', amenities: ['meal', 'usb'] },
    { id: 'EJ-301', airline: 'EuroJet', code: 'EJ', from: 'New York', fromCode: 'JFK', to: 'London', toCode: 'LHR', dep: '06:00', arr: '14:00', duration: '8h 00m', stops: 1, price: 299, class: 'economy', seats: 60, badge: null, amenities: ['wifi'] },
    { id: 'SK-103', airline: 'SkyHook', code: 'SK', from: 'London', fromCode: 'LHR', to: 'New York', toCode: 'JFK', dep: '09:00', arr: '12:00', duration: '8h 00m', stops: 0, price: 440, class: 'economy', seats: 28, badge: null, amenities: ['wifi', 'meal', 'usb'] },
    { id: 'PA-202', airline: 'Pacific Air', code: 'PA', from: 'London', fromCode: 'LHR', to: 'New York', toCode: 'JFK', dep: '15:00', arr: '18:30', duration: '8h 30m', stops: 0, price: 395, class: 'economy', seats: 50, badge: 'deal', amenities: ['meal'] },

    // ---- Dubai routes ----
    { id: 'SK-401', airline: 'SkyHook', code: 'SK', from: 'Dubai', fromCode: 'DXB', to: 'London', toCode: 'LHR', dep: '02:00', arr: '07:00', duration: '7h 00m', stops: 0, price: 350, class: 'economy', seats: 40, badge: null, amenities: ['wifi', 'meal', 'usb'] },
    { id: 'SK-402', airline: 'SkyHook', code: 'SK', from: 'London', fromCode: 'LHR', to: 'Dubai', toCode: 'DXB', dep: '21:00', arr: '07:00+1', duration: '7h 00m', stops: 0, price: 360, class: 'economy', seats: 35, badge: 'popular', amenities: ['wifi', 'meal', 'usb'] },
    { id: 'EJ-402', airline: 'EuroJet', code: 'EJ', from: 'Dubai', fromCode: 'DXB', to: 'Mumbai', toCode: 'BOM', dep: '10:00', arr: '14:30', duration: '3h 30m', stops: 0, price: 180, class: 'economy', seats: 70, badge: 'deal', amenities: ['meal'] },
    { id: 'SK-403', airline: 'SkyHook', code: 'SK', from: 'Dubai', fromCode: 'DXB', to: 'Singapore', toCode: 'SIN', dep: '23:30', arr: '11:30+1', duration: '7h 00m', stops: 0, price: 410, class: 'economy', seats: 22, badge: null, amenities: ['wifi', 'meal'] },

    // ---- Singapore routes ----
    { id: 'SK-501', airline: 'SkyHook', code: 'SK', from: 'Singapore', fromCode: 'SIN', to: 'Tokyo', toCode: 'NRT', dep: '08:30', arr: '16:30', duration: '7h 00m', stops: 0, price: 380, class: 'economy', seats: 30, badge: null, amenities: ['wifi', 'meal', 'usb'] },
    { id: 'PA-501', airline: 'Pacific Air', code: 'PA', from: 'Singapore', fromCode: 'SIN', to: 'Sydney', toCode: 'SYD', dep: '14:00', arr: '23:00', duration: '8h 00m', stops: 0, price: 420, class: 'economy', seats: 55, badge: 'popular', amenities: ['wifi', 'meal'] },
    { id: 'EJ-501', airline: 'EuroJet', code: 'EJ', from: 'Singapore', fromCode: 'SIN', to: 'London', toCode: 'LHR', dep: '23:00', arr: '06:00+1', duration: '13h 00m', stops: 1, price: 520, class: 'economy', seats: 48, badge: null, amenities: ['wifi', 'meal', 'usb'] },

    // ---- Paris routes ----
    { id: 'EJ-601', airline: 'EuroJet', code: 'EJ', from: 'Paris', fromCode: 'CDG', to: 'Berlin', toCode: 'BER', dep: '09:15', arr: '10:45', duration: '1h 30m', stops: 0, price: 95, class: 'economy', seats: 80, badge: 'deal', amenities: ['snack'] },
    { id: 'SK-601', airline: 'SkyHook', code: 'SK', from: 'Paris', fromCode: 'CDG', to: 'New York', toCode: 'JFK', dep: '11:00', arr: '13:30', duration: '8h 30m', stops: 0, price: 490, class: 'economy', seats: 25, badge: null, amenities: ['wifi', 'meal', 'usb'] },
    { id: 'PA-601', airline: 'Pacific Air', code: 'PA', from: 'Paris', fromCode: 'CDG', to: 'Dubai', toCode: 'DXB', dep: '07:00', arr: '14:00', duration: '6h 00m', stops: 0, price: 310, class: 'economy', seats: 42, badge: null, amenities: ['meal'] },

    // ---- Mumbai routes ----
    { id: 'SK-701', airline: 'SkyHook', code: 'SK', from: 'Mumbai', fromCode: 'BOM', to: 'London', toCode: 'LHR', dep: '02:30', arr: '08:00', duration: '9h 30m', stops: 0, price: 580, class: 'economy', seats: 20, badge: null, amenities: ['wifi', 'meal', 'usb'] },
    { id: 'EJ-701', airline: 'EuroJet', code: 'EJ', from: 'Mumbai', fromCode: 'BOM', to: 'Singapore', toCode: 'SIN', dep: '06:00', arr: '14:00', duration: '5h 30m', stops: 0, price: 250, class: 'economy', seats: 65, badge: 'popular', amenities: ['meal', 'usb'] },
    { id: 'PA-701', airline: 'Pacific Air', code: 'PA', from: 'Mumbai', fromCode: 'BOM', to: 'Dubai', toCode: 'DXB', dep: '10:00', arr: '12:00', duration: '3h 00m', stops: 0, price: 160, class: 'economy', seats: 90, badge: 'deal', amenities: ['snack'] },

    // ---- Los Angeles routes ----
    { id: 'SK-801', airline: 'SkyHook', code: 'SK', from: 'Los Angeles', fromCode: 'LAX', to: 'Tokyo', toCode: 'NRT', dep: '13:00', arr: '17:00+1', duration: '11h 00m', stops: 0, price: 650, class: 'economy', seats: 15, badge: null, amenities: ['wifi', 'meal', 'usb'] },
    { id: 'PA-801', airline: 'Pacific Air', code: 'PA', from: 'Los Angeles', fromCode: 'LAX', to: 'Sydney', toCode: 'SYD', dep: '22:00', arr: '09:00+2', duration: '15h 00m', stops: 0, price: 720, class: 'economy', seats: 30, badge: 'popular', amenities: ['wifi', 'meal', 'usb'] },
    { id: 'EJ-801', airline: 'EuroJet', code: 'EJ', from: 'Los Angeles', fromCode: 'LAX', to: 'London', toCode: 'LHR', dep: '17:00', arr: '11:00+1', duration: '10h 00m', stops: 1, price: 480, class: 'economy', seats: 55, badge: null, amenities: ['wifi', 'meal'] },

    // ---- Toronto routes ----
    { id: 'SK-901', airline: 'SkyHook', code: 'SK', from: 'Toronto', fromCode: 'YYZ', to: 'London', toCode: 'LHR', dep: '20:00', arr: '08:00+1', duration: '7h 00m', stops: 0, price: 430, class: 'economy', seats: 38, badge: null, amenities: ['wifi', 'meal'] },
    { id: 'PA-901', airline: 'Pacific Air', code: 'PA', from: 'Toronto', fromCode: 'YYZ', to: 'Paris', toCode: 'CDG', dep: '22:30', arr: '11:00+1', duration: '7h 30m', stops: 0, price: 460, class: 'economy', seats: 42, badge: 'deal', amenities: ['wifi', 'meal', 'usb'] },

    // ---- Business Class ----
    { id: 'SK-B01', airline: 'SkyHook', code: 'SK', from: 'New York', fromCode: 'JFK', to: 'London', toCode: 'LHR', dep: '09:00', arr: '21:00', duration: '7h 00m', stops: 0, price: 1850, class: 'business', seats: 8, badge: null, amenities: ['wifi', 'meal', 'usb', 'lounge'] },
    { id: 'SK-B02', airline: 'SkyHook', code: 'SK', from: 'London', fromCode: 'LHR', to: 'Dubai', toCode: 'DXB', dep: '14:00', arr: '00:00+1', duration: '7h 00m', stops: 0, price: 2100, class: 'business', seats: 6, badge: null, amenities: ['wifi', 'meal', 'usb', 'lounge'] },
    { id: 'PA-B01', airline: 'Pacific Air', code: 'PA', from: 'Singapore', fromCode: 'SIN', to: 'London', toCode: 'LHR', dep: '22:00', arr: '05:00+1', duration: '13h 00m', stops: 0, price: 2800, class: 'business', seats: 4, badge: 'popular', amenities: ['wifi', 'meal', 'usb', 'lounge'] },

    // ---- First Class ----
    { id: 'SK-F01', airline: 'SkyHook', code: 'SK', from: 'New York', fromCode: 'JFK', to: 'London', toCode: 'LHR', dep: '10:00', arr: '22:00', duration: '7h 00m', stops: 0, price: 4500, class: 'first', seats: 4, badge: null, amenities: ['wifi', 'meal', 'usb', 'lounge', 'spa'] },
    { id: 'PA-F01', airline: 'Pacific Air', code: 'PA', from: 'Dubai', fromCode: 'DXB', to: 'London', toCode: 'LHR', dep: '03:00', arr: '08:00', duration: '7h 00m', stops: 0, price: 5200, class: 'first', seats: 2, badge: null, amenities: ['wifi', 'meal', 'usb', 'lounge', 'spa'] },

    // ---- India Domestic: Delhi ----
    { id: 'IG-101', airline: 'IndiGo', code: 'IG', from: 'Delhi', fromCode: 'DEL', to: 'Mumbai', toCode: 'BOM', dep: '06:00', arr: '08:10', duration: '2h 10m', stops: 0, price: 75, class: 'economy', seats: 120, badge: 'deal', amenities: ['snack'] },
    { id: 'AI-101', airline: 'Air India', code: 'AI', from: 'Delhi', fromCode: 'DEL', to: 'Mumbai', toCode: 'BOM', dep: '09:30', arr: '11:45', duration: '2h 15m', stops: 0, price: 95, class: 'economy', seats: 80, badge: null, amenities: ['meal', 'usb'] },
    { id: 'SJ-101', airline: 'SpiceJet', code: 'SJ', from: 'Delhi', fromCode: 'DEL', to: 'Mumbai', toCode: 'BOM', dep: '14:00', arr: '16:15', duration: '2h 15m', stops: 0, price: 65, class: 'economy', seats: 90, badge: 'popular', amenities: ['snack'] },
    { id: 'IG-102', airline: 'IndiGo', code: 'IG', from: 'Delhi', fromCode: 'DEL', to: 'Bangalore', toCode: 'BLR', dep: '07:00', arr: '09:40', duration: '2h 40m', stops: 0, price: 82, class: 'economy', seats: 100, badge: null, amenities: ['snack'] },
    { id: 'AI-102', airline: 'Air India', code: 'AI', from: 'Delhi', fromCode: 'DEL', to: 'Bangalore', toCode: 'BLR', dep: '13:00', arr: '15:45', duration: '2h 45m', stops: 0, price: 105, class: 'economy', seats: 70, badge: null, amenities: ['meal'] },
    { id: 'IG-103', airline: 'IndiGo', code: 'IG', from: 'Delhi', fromCode: 'DEL', to: 'Chennai', toCode: 'MAA', dep: '05:30', arr: '08:20', duration: '2h 50m', stops: 0, price: 78, class: 'economy', seats: 85, badge: 'deal', amenities: ['snack'] },
    { id: 'IG-104', airline: 'IndiGo', code: 'IG', from: 'Delhi', fromCode: 'DEL', to: 'Kolkata', toCode: 'CCU', dep: '08:00', arr: '10:10', duration: '2h 10m', stops: 0, price: 70, class: 'economy', seats: 95, badge: null, amenities: ['snack'] },
    { id: 'AI-103', airline: 'Air India', code: 'AI', from: 'Delhi', fromCode: 'DEL', to: 'Hyderabad', toCode: 'HYD', dep: '10:00', arr: '12:15', duration: '2h 15m', stops: 0, price: 88, class: 'economy', seats: 75, badge: null, amenities: ['meal'] },
    { id: 'SJ-102', airline: 'SpiceJet', code: 'SJ', from: 'Delhi', fromCode: 'DEL', to: 'Jaipur', toCode: 'JAI', dep: '07:30', arr: '08:25', duration: '0h 55m', stops: 0, price: 42, class: 'economy', seats: 60, badge: 'deal', amenities: ['snack'] },
    { id: 'IG-105', airline: 'IndiGo', code: 'IG', from: 'Delhi', fromCode: 'DEL', to: 'Goa', toCode: 'GOI', dep: '11:00', arr: '13:30', duration: '2h 30m', stops: 0, price: 90, class: 'economy', seats: 110, badge: 'popular', amenities: ['snack'] },
    { id: 'AI-104', airline: 'Air India', code: 'AI', from: 'Delhi', fromCode: 'DEL', to: 'Lucknow', toCode: 'LKO', dep: '15:00', arr: '16:10', duration: '1h 10m', stops: 0, price: 48, class: 'economy', seats: 65, badge: null, amenities: ['snack'] },

    // ---- India Domestic: Mumbai ----
    { id: 'IG-201', airline: 'IndiGo', code: 'IG', from: 'Mumbai', fromCode: 'BOM', to: 'Delhi', toCode: 'DEL', dep: '06:30', arr: '08:40', duration: '2h 10m', stops: 0, price: 72, class: 'economy', seats: 115, badge: null, amenities: ['snack'] },
    { id: 'AI-201', airline: 'Air India', code: 'AI', from: 'Mumbai', fromCode: 'BOM', to: 'Bangalore', toCode: 'BLR', dep: '07:00', arr: '08:30', duration: '1h 30m', stops: 0, price: 55, class: 'economy', seats: 90, badge: 'deal', amenities: ['snack'] },
    { id: 'SJ-201', airline: 'SpiceJet', code: 'SJ', from: 'Mumbai', fromCode: 'BOM', to: 'Chennai', toCode: 'MAA', dep: '09:00', arr: '10:50', duration: '1h 50m', stops: 0, price: 62, class: 'economy', seats: 80, badge: null, amenities: ['snack'] },
    { id: 'IG-202', airline: 'IndiGo', code: 'IG', from: 'Mumbai', fromCode: 'BOM', to: 'Hyderabad', toCode: 'HYD', dep: '10:30', arr: '11:55', duration: '1h 25m', stops: 0, price: 52, class: 'economy', seats: 100, badge: 'popular', amenities: ['snack'] },
    { id: 'IG-203', airline: 'IndiGo', code: 'IG', from: 'Mumbai', fromCode: 'BOM', to: 'Kolkata', toCode: 'CCU', dep: '12:00', arr: '14:30', duration: '2h 30m', stops: 0, price: 85, class: 'economy', seats: 75, badge: null, amenities: ['snack'] },
    { id: 'AI-202', airline: 'Air India', code: 'AI', from: 'Mumbai', fromCode: 'BOM', to: 'Goa', toCode: 'GOI', dep: '08:00', arr: '09:05', duration: '1h 05m', stops: 0, price: 45, class: 'economy', seats: 110, badge: 'deal', amenities: ['snack'] },
    { id: 'SJ-202', airline: 'SpiceJet', code: 'SJ', from: 'Mumbai', fromCode: 'BOM', to: 'Pune', toCode: 'PNQ', dep: '16:00', arr: '16:45', duration: '0h 45m', stops: 0, price: 35, class: 'economy', seats: 50, badge: null, amenities: ['snack'] },
    { id: 'IG-204', airline: 'IndiGo', code: 'IG', from: 'Mumbai', fromCode: 'BOM', to: 'Ahmedabad', toCode: 'AMD', dep: '18:00', arr: '19:15', duration: '1h 15m', stops: 0, price: 48, class: 'economy', seats: 85, badge: null, amenities: ['snack'] },
    { id: 'IG-205', airline: 'IndiGo', code: 'IG', from: 'Mumbai', fromCode: 'BOM', to: 'Kochi', toCode: 'COK', dep: '20:00', arr: '22:00', duration: '2h 00m', stops: 0, price: 68, class: 'economy', seats: 70, badge: null, amenities: ['snack'] },

    // ---- India Domestic: Bangalore ----
    { id: 'IG-301', airline: 'IndiGo', code: 'IG', from: 'Bangalore', fromCode: 'BLR', to: 'Delhi', toCode: 'DEL', dep: '05:30', arr: '08:10', duration: '2h 40m', stops: 0, price: 80, class: 'economy', seats: 95, badge: null, amenities: ['snack'] },
    { id: 'AI-301', airline: 'Air India', code: 'AI', from: 'Bangalore', fromCode: 'BLR', to: 'Mumbai', toCode: 'BOM', dep: '11:00', arr: '12:30', duration: '1h 30m', stops: 0, price: 58, class: 'economy', seats: 85, badge: 'popular', amenities: ['snack'] },
    { id: 'SJ-301', airline: 'SpiceJet', code: 'SJ', from: 'Bangalore', fromCode: 'BLR', to: 'Chennai', toCode: 'MAA', dep: '06:30', arr: '07:25', duration: '0h 55m', stops: 0, price: 38, class: 'economy', seats: 70, badge: 'deal', amenities: ['snack'] },
    { id: 'IG-302', airline: 'IndiGo', code: 'IG', from: 'Bangalore', fromCode: 'BLR', to: 'Hyderabad', toCode: 'HYD', dep: '09:00', arr: '10:10', duration: '1h 10m', stops: 0, price: 45, class: 'economy', seats: 90, badge: null, amenities: ['snack'] },
    { id: 'IG-303', airline: 'IndiGo', code: 'IG', from: 'Bangalore', fromCode: 'BLR', to: 'Kolkata', toCode: 'CCU', dep: '14:00', arr: '16:30', duration: '2h 30m', stops: 0, price: 88, class: 'economy', seats: 60, badge: null, amenities: ['snack'] },
    { id: 'AI-302', airline: 'Air India', code: 'AI', from: 'Bangalore', fromCode: 'BLR', to: 'Kochi', toCode: 'COK', dep: '17:00', arr: '18:05', duration: '1h 05m', stops: 0, price: 42, class: 'economy', seats: 65, badge: null, amenities: ['snack'] },

    // ---- India Domestic: Other key routes ----
    { id: 'IG-401', airline: 'IndiGo', code: 'IG', from: 'Chennai', fromCode: 'MAA', to: 'Delhi', toCode: 'DEL', dep: '06:00', arr: '08:50', duration: '2h 50m', stops: 0, price: 82, class: 'economy', seats: 80, badge: null, amenities: ['snack'] },
    { id: 'AI-401', airline: 'Air India', code: 'AI', from: 'Chennai', fromCode: 'MAA', to: 'Hyderabad', toCode: 'HYD', dep: '08:00', arr: '09:10', duration: '1h 10m', stops: 0, price: 40, class: 'economy', seats: 75, badge: 'deal', amenities: ['snack'] },
    { id: 'IG-402', airline: 'IndiGo', code: 'IG', from: 'Hyderabad', fromCode: 'HYD', to: 'Delhi', toCode: 'DEL', dep: '07:00', arr: '09:15', duration: '2h 15m', stops: 0, price: 78, class: 'economy', seats: 88, badge: null, amenities: ['snack'] },
    { id: 'SJ-401', airline: 'SpiceJet', code: 'SJ', from: 'Hyderabad', fromCode: 'HYD', to: 'Mumbai', toCode: 'BOM', dep: '13:00', arr: '14:25', duration: '1h 25m', stops: 0, price: 50, class: 'economy', seats: 72, badge: 'popular', amenities: ['snack'] },
    { id: 'IG-403', airline: 'IndiGo', code: 'IG', from: 'Kolkata', fromCode: 'CCU', to: 'Delhi', toCode: 'DEL', dep: '06:00', arr: '08:10', duration: '2h 10m', stops: 0, price: 72, class: 'economy', seats: 85, badge: null, amenities: ['snack'] },
    { id: 'AI-403', airline: 'Air India', code: 'AI', from: 'Kolkata', fromCode: 'CCU', to: 'Bangalore', toCode: 'BLR', dep: '10:00', arr: '12:30', duration: '2h 30m', stops: 0, price: 85, class: 'economy', seats: 60, badge: null, amenities: ['meal'] },
    { id: 'IG-404', airline: 'IndiGo', code: 'IG', from: 'Pune', fromCode: 'PNQ', to: 'Delhi', toCode: 'DEL', dep: '07:00', arr: '09:10', duration: '2h 10m', stops: 0, price: 72, class: 'economy', seats: 78, badge: null, amenities: ['snack'] },
    { id: 'SJ-404', airline: 'SpiceJet', code: 'SJ', from: 'Ahmedabad', fromCode: 'AMD', to: 'Delhi', toCode: 'DEL', dep: '08:00', arr: '09:25', duration: '1h 25m', stops: 0, price: 55, class: 'economy', seats: 65, badge: null, amenities: ['snack'] },
    { id: 'IG-405', airline: 'IndiGo', code: 'IG', from: 'Goa', fromCode: 'GOI', to: 'Delhi', toCode: 'DEL', dep: '15:00', arr: '17:30', duration: '2h 30m', stops: 0, price: 92, class: 'economy', seats: 100, badge: 'popular', amenities: ['snack'] },
    { id: 'AI-405', airline: 'Air India', code: 'AI', from: 'Kochi', fromCode: 'COK', to: 'Delhi', toCode: 'DEL', dep: '06:00', arr: '09:00', duration: '3h 00m', stops: 0, price: 98, class: 'economy', seats: 55, badge: null, amenities: ['meal'] },

    // ---- India International ----
    { id: 'AI-501', airline: 'Air India', code: 'AI', from: 'Delhi', fromCode: 'DEL', to: 'London', toCode: 'LHR', dep: '01:30', arr: '06:30', duration: '9h 00m', stops: 0, price: 520, class: 'economy', seats: 30, badge: null, amenities: ['wifi', 'meal', 'usb'] },
    { id: 'AI-502', airline: 'Air India', code: 'AI', from: 'Delhi', fromCode: 'DEL', to: 'Dubai', toCode: 'DXB', dep: '04:00', arr: '06:00', duration: '3h 30m', stops: 0, price: 180, class: 'economy', seats: 55, badge: 'deal', amenities: ['meal'] },
    { id: 'IG-501', airline: 'IndiGo', code: 'IG', from: 'Mumbai', fromCode: 'BOM', to: 'Dubai', toCode: 'DXB', dep: '03:00', arr: '05:00', duration: '3h 00m', stops: 0, price: 155, class: 'economy', seats: 80, badge: 'popular', amenities: ['snack'] },
    { id: 'AI-503', airline: 'Air India', code: 'AI', from: 'Delhi', fromCode: 'DEL', to: 'Singapore', toCode: 'SIN', dep: '23:00', arr: '07:00+1', duration: '5h 30m', stops: 0, price: 280, class: 'economy', seats: 40, badge: null, amenities: ['wifi', 'meal'] },
    { id: 'AI-504', airline: 'Air India', code: 'AI', from: 'Bangalore', fromCode: 'BLR', to: 'Singapore', toCode: 'SIN', dep: '22:00', arr: '05:30+1', duration: '4h 00m', stops: 0, price: 245, class: 'economy', seats: 45, badge: null, amenities: ['meal'] },
    { id: 'AI-505', airline: 'Air India', code: 'AI', from: 'Chennai', fromCode: 'MAA', to: 'Dubai', toCode: 'DXB', dep: '02:00', arr: '04:30', duration: '4h 00m', stops: 0, price: 170, class: 'economy', seats: 50, badge: 'deal', amenities: ['meal'] }
];

const POPULAR_ROUTES = [
    { from: 'Delhi', to: 'Mumbai', price: 65, tag: '🇮🇳 Most Popular' },
    { from: 'Mumbai', to: 'Goa', price: 45, tag: '🇮🇳 Weekend Escape' },
    { from: 'Bangalore', to: 'Delhi', price: 80, tag: '🇮🇳 Business Hub' },
    { from: 'Delhi', to: 'Jaipur', price: 42, tag: '🇮🇳 Quick Hop' },
    { from: 'Chennai', to: 'Hyderabad', price: 40, tag: '🇮🇳 Best Value' },
    { from: 'Mumbai', to: 'Dubai', price: 155, tag: 'International Deal' },
    { from: 'New York', to: 'London', price: 299, tag: 'Transatlantic' },
    { from: 'Delhi', to: 'Singapore', price: 280, tag: 'Asia Connect' }
];

const FLIGHT_STATUSES = ['On Time', 'On Time', 'On Time', 'Delayed', 'Boarding', 'Cancelled'];

class FlightApp {
    constructor() {
        // Always reset flight data so fresh FLIGHT_DATA is used on every load
        const stored = JSON.parse(localStorage.getItem('skyhook_v2') || '{}');
        localStorage.setItem('skyhook_v2', JSON.stringify({ flights: FLIGHT_DATA, bookings: stored.bookings || [] }));
        this.api = new MockAPI('skyhook_v2', { flights: FLIGHT_DATA, bookings: [] });
        this.selectedFlight = null;
        this.selectedSeats = [];   // array – one seat per passenger
        this.passengerCount = 1;
        this.tripType = 'one-way';
        this.cancelTarget = null;
        this.promoApplied = false;
        this.init();
    }

    init() {
        this.setupNavTabs();
        this.renderPopularRoutes();
        this.loadProfile();
        this.setupPaymentToggle();
        this.setupCardFormatting();
    }

    // ===== NAVIGATION =====
    setupNavTabs() {
        document.querySelectorAll('.nav-link[data-target]').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const target = link.dataset.target;
                document.querySelectorAll('.section-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                document.getElementById(target).classList.add('active');
                link.classList.add('active');
                if (target === 'tab-bookings') this.renderMyBookings();
            });
        });
    }

    showTab(tabId) {
        document.querySelectorAll('.section-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        const tab = document.getElementById(tabId);
        if (tab) tab.classList.add('active');
        const navLink = document.querySelector(`.nav-link[data-target="${tabId}"]`);
        if (navLink) navLink.classList.add('active');
    }

    // ===== SEARCH =====
    setTripType(type) {
        this.tripType = type;
        document.querySelectorAll('.trip-tab').forEach(t => t.classList.remove('active'));
        document.querySelector(`[data-trip="${type}"]`).classList.add('active');
        const retGroup = document.getElementById('ret-date-group');
        retGroup.style.display = (type === 'round-trip') ? 'flex' : 'none';
    }

    swapCities() {
        const from = document.getElementById('fromCity');
        const to = document.getElementById('toCity');
        [from.value, to.value] = [to.value, from.value];
        from.style.animation = 'none'; to.style.animation = 'none';
        setTimeout(() => { from.style.animation = ''; to.style.animation = ''; }, 10);
    }

    // ===== SMART CITY MATCHING =====
    // Matches user input against city name OR airport code (case-insensitive, partial)
    cityMatches(flightCity, flightCode, input) {
        const q = input.toLowerCase().replace(/[()]/g, '').trim();
        return flightCity.toLowerCase().includes(q) || flightCode.toLowerCase().includes(q);
    }

    // Resolve the canonical city name from user input
    resolveCity(input) {
        const q = input.toLowerCase().replace(/[()]/g, '').trim();
        for (const f of FLIGHT_DATA) {
            if (f.from.toLowerCase().includes(q) || f.fromCode.toLowerCase().includes(q)) return { city: f.from, code: f.fromCode };
            if (f.to.toLowerCase().includes(q) || f.toCode.toLowerCase().includes(q)) return { city: f.to, code: f.toCode };
        }
        // Return the raw input capitalised if not found
        return { city: input.charAt(0).toUpperCase() + input.slice(1), code: input.toUpperCase().substring(0, 3) };
    }

    // Generate realistic connecting flights for routes not in the dataset
    generateConnectingFlights(fromCity, fromCode, toCity, toCode, cabinClass) {
        const hubs = [
            { city: 'Dubai', code: 'DXB' },
            { city: 'London', code: 'LHR' },
            { city: 'Singapore', code: 'SIN' },
            { city: 'New York', code: 'JFK' },
            { city: 'Frankfurt', code: 'FRA' },
        ];
        const airlines = [
            { name: 'SkyHook', code: 'SK' },
            { name: 'Pacific Air', code: 'PA' },
            { name: 'EuroJet', code: 'EJ' },
            { name: 'GlobalWings', code: 'GW' },
            { name: 'AirConnect', code: 'AC' },
        ];
        const generated = [];
        let idCounter = 900;

        // Pick 2-3 different hub connections
        const usedHubs = hubs.filter(h => h.city !== fromCity && h.city !== toCity).slice(0, 3);

        usedHubs.forEach((hub, i) => {
            const airline = airlines[i % airlines.length];
            const depHour = 6 + i * 4;
            const durationHrs = Math.floor(Math.random() * 8) + 4;
            const arrHour = (depHour + durationHrs) % 24;
            const basePrice = Math.floor(Math.random() * 400) + 200;
            const classMultiplier = cabinClass === 'business' ? 3.5 : cabinClass === 'first' ? 7 : 1;
            const price = Math.round(basePrice * classMultiplier);
            const flightClass = cabinClass === 'premium' ? 'economy' : cabinClass;

            generated.push({
                id: `${airline.code}-${idCounter + i}`,
                airline: airline.name,
                code: airline.code,
                from: fromCity, fromCode,
                to: toCity, toCode,
                dep: `${String(depHour).padStart(2, '0')}:${i % 2 === 0 ? '00' : '30'}`,
                arr: `${String(arrHour).padStart(2, '0')}:${i % 2 === 0 ? '30' : '00'}`,
                duration: `${durationHrs}h ${i % 2 === 0 ? '00' : '30'}m`,
                stops: 1,
                stopCity: hub.city,
                price,
                class: flightClass,
                seats: Math.floor(Math.random() * 60) + 10,
                badge: i === 0 ? 'deal' : null,
                amenities: ['wifi', 'meal'],
                generated: true
            });
        });

        // Also add one direct option (longer, pricier)
        const directAirline = airlines[3];
        const directDep = 10;
        const directDur = Math.floor(Math.random() * 6) + 8;
        const directPrice = Math.round((Math.floor(Math.random() * 300) + 350) * (cabinClass === 'business' ? 3.5 : cabinClass === 'first' ? 7 : 1));
        generated.unshift({
            id: `${directAirline.code}-${idCounter + 10}`,
            airline: directAirline.name,
            code: directAirline.code,
            from: fromCity, fromCode,
            to: toCity, toCode,
            dep: `${String(directDep).padStart(2, '0')}:00`,
            arr: `${String((directDep + directDur) % 24).padStart(2, '0')}:00`,
            duration: `${directDur}h 00m`,
            stops: 0,
            price: directPrice,
            class: cabinClass === 'premium' ? 'economy' : cabinClass,
            seats: Math.floor(Math.random() * 30) + 5,
            badge: 'popular',
            amenities: ['wifi', 'meal', 'usb'],
            generated: true
        });

        return generated;
    }

    async searchFlights() {
        const fromInput = document.getElementById('fromCity').value.trim();
        const toInput = document.getElementById('toCity').value.trim();
        const cabinClass = document.getElementById('cabinClass').value;
        this.passengerCount = parseInt(document.getElementById('passengers').value);

        if (!fromInput || !toInput) { this.toast('Please enter departure and destination cities', 'error'); return; }
        if (fromInput.toLowerCase() === toInput.toLowerCase()) { this.toast('Departure and destination cannot be the same', 'error'); return; }

        document.getElementById('popular-routes').style.display = 'none';
        document.getElementById('results-section').style.display = 'block';
        document.getElementById('flight-list').innerHTML = `<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i><p style="margin-top:1rem;">Searching best fares across 500+ routes...</p></div>`;

        await this.delay(1200);

        // Resolve canonical city info from user input
        const fromResolved = this.resolveCity(fromInput);
        const toResolved = this.resolveCity(toInput);

        let flights = await this.api.get('flights');

        // Smart filter: match by city name OR airport code
        let matched = flights.filter(f => {
            const fromMatch = this.cityMatches(f.from, f.fromCode, fromInput);
            const toMatch = this.cityMatches(f.to, f.toCode, toInput);
            if (!fromMatch || !toMatch) return false;

            // Cabin class filter (inclusive)
            if (cabinClass === 'economy') return f.class === 'economy';
            if (cabinClass === 'premium') return f.class === 'economy' || f.class === 'premium';
            if (cabinClass === 'business') return f.class === 'business';
            if (cabinClass === 'first') return f.class === 'first';
            return true;
        });

        // If no direct flights found, generate connecting options
        if (matched.length === 0) {
            matched = this.generateConnectingFlights(
                fromResolved.city, fromResolved.code,
                toResolved.city, toResolved.code,
                cabinClass
            );
        }

        this.allResults = matched;
        const count = this.allResults.length;
        document.getElementById('results-title').textContent = `${fromResolved.city} → ${toResolved.city}`;
        document.getElementById('results-count').textContent = `${count} flight${count !== 1 ? 's' : ''} found`;

        this.currentFilter = 'all';
        this.renderFlightCards(this.allResults);
        this.toast(`Found ${count} flight${count !== 1 ? 's' : ''} for your route`, 'success');
    }

    renderFlightCards(flights) {
        const amenityIcons = { wifi: '<i class="fas fa-wifi"></i> Wi-Fi', meal: '<i class="fas fa-utensils"></i> Meal', usb: '<i class="fas fa-plug"></i> USB', snack: '<i class="fas fa-cookie"></i> Snack', lounge: '<i class="fas fa-couch"></i> Lounge', spa: '<i class="fas fa-spa"></i> Spa' };
        document.getElementById('flight-list').innerHTML = flights.map(f => `
            <div class="flight-card" id="fc-${f.id}" data-flight-id="${f.id}" data-stops="${f.stops}">
                ${f.badge === 'deal' ? '<div class="badge-deal">Best Deal</div>' : f.badge === 'popular' ? '<div class="badge-popular">Popular</div>' : ''}
                <div class="flight-card-inner">
                    <div class="airline-col">
                        <div class="airline-logo">${f.code}</div>
                        <div>
                            <div class="airline-name">${f.airline}</div>
                            <div class="flight-no">${f.id}</div>
                        </div>
                    </div>
                    <div class="route-col">
                        <div class="time-block">
                            <div class="time-big">${f.dep}</div>
                            <div class="city-code">${f.fromCode}</div>
                        </div>
                        <div class="route-line">
                            <div class="route-line-bar"></div>
                            <div class="duration-label">${f.duration}</div>
                            <div class="stops-label ${f.stops === 0 ? 'nonstop' : ''}">${f.stops === 0 ? 'Non-stop' : (f.stopCity ? `via ${f.stopCity}` : f.stops + ' Stop')}</div>
                        </div>
                        <div class="time-block">
                            <div class="time-big">${f.arr}</div>
                            <div class="city-code">${f.toCode}</div>
                        </div>
                    </div>
                    <div class="price-col">
                        <div class="price-amount">$${(f.price * this.passengerCount).toLocaleString()}</div>
                        <div class="price-per">${this.passengerCount > 1 ? `$${f.price}/person` : 'per person'}</div>
                        <button class="btn-select" id="btn-select-${f.id}" onclick="flightApp.selectFlight('${f.id}')">
                            <i class="fas fa-check"></i> Select
                        </button>
                        <div style="font-size:0.7rem;color:#94a3b8;margin-top:0.25rem;">${f.seats} seats left</div>
                    </div>
                </div>
                <div class="amenities">
                    ${f.amenities.map(a => `<span class="amenity">${amenityIcons[a] || a}</span>`).join('')}
                    <span class="amenity" style="margin-left:auto;color:#0284c7;font-weight:600;">${f.class.charAt(0).toUpperCase() + f.class.slice(1)}</span>
                </div>
            </div>
        `).join('');
    }

    filterByStop(btn, filter) {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = filter;
        const filtered = filter === 'all' ? this.allResults : this.allResults.filter(f => f.stops === parseInt(filter));
        this.renderFlightCards(filtered);
    }

    sortResults() {
        const sortBy = document.getElementById('sort-by').value;
        const list = [...(this.allResults || [])];
        if (sortBy === 'price') list.sort((a, b) => a.price - b.price);
        else if (sortBy === 'duration') list.sort((a, b) => a.duration.localeCompare(b.duration));
        else if (sortBy === 'departure') list.sort((a, b) => a.dep.localeCompare(b.dep));
        this.renderFlightCards(list);
    }

    renderPopularRoutes() {
        const grid = document.getElementById('routes-grid');
        grid.innerHTML = POPULAR_ROUTES.map(r => `
            <div class="route-card" onclick="flightApp.quickSearch('${r.from}','${r.to}')" data-from="${r.from}" data-to="${r.to}">
                <div class="route-cities">${r.from} → ${r.to}</div>
                <div class="route-price">From $${r.price}</div>
                <div class="route-tag">${r.tag}</div>
            </div>
        `).join('');
    }

    quickSearch(from, to) {
        document.getElementById('fromCity').value = from;
        document.getElementById('toCity').value = to;
        this.searchFlights();
    }

    // ===== SEAT SELECTION =====
    async selectFlight(id) {
        // First check current search results (includes generated connecting flights)
        let flight = (this.allResults || []).find(f => f.id === id);
        // Fall back to API store
        if (!flight) {
            const flights = await this.api.get('flights');
            flight = flights.find(f => f.id === id);
        }
        if (!flight) {
            this.toast('Flight not found. Please search again.', 'error');
            return;
        }
        this.selectedFlight = flight;
        this.selectedSeats = [];   // reset seat selection for new flight
        this.openSeatModal();
    }

    openSeatModal() {
        const f = this.selectedFlight;
        const pax = this.passengerCount;
        document.getElementById('modal-seat-title').innerHTML =
            `<i class="fas fa-chair"></i> Select Your Seat${pax > 1 ? 's' : ''} (${pax} passenger${pax > 1 ? 's' : ''})`;
        document.getElementById('seat-flight-info').innerHTML = `
            <strong>${f.airline} ${f.id}</strong> &nbsp;|&nbsp; ${f.from} → ${f.to} &nbsp;|&nbsp; ${f.dep} – ${f.arr} &nbsp;|&nbsp; $${f.price}/person
        `;
        this.renderSeatMap();
        document.getElementById('seat-selection-info').textContent =
            `Please select ${pax} seat${pax > 1 ? 's' : ''} to continue`;
        document.getElementById('btn-proceed-passenger').disabled = true;
        this.openModal('modal-seat');
    }

    renderSeatMap() {
        const map = document.getElementById('seat-map');
        const cols = ['A', 'B', 'C', 'D', 'E', 'F'];
        const rows = 20;
        const occupied = this.generateOccupied(rows, cols);
        const extraLegroom = [1, 2, 10, 11];

        let html = `<div class="seat-row"><div class="seat-row-num"></div>${cols.slice(0, 3).map(c => `<div style="width:36px;text-align:center;font-size:0.7rem;color:#94a3b8;font-weight:700;">${c}</div>`).join('')}<div class="seat-aisle"></div>${cols.slice(3).map(c => `<div style="width:36px;text-align:center;font-size:0.7rem;color:#94a3b8;font-weight:700;">${c}</div>`).join('')}</div>`;

        for (let r = 1; r <= rows; r++) {
            html += `<div class="seat-row"><div class="seat-row-num">${r}</div>`;
            cols.forEach((c, i) => {
                if (i === 3) html += `<div class="seat-aisle"></div>`;
                const seatId = `${r}${c}`;
                const isOccupied = occupied.has(seatId);
                const isExtra = extraLegroom.includes(r);
                const cls = isOccupied ? 'occupied' : isExtra ? 'extra-legroom' : '';
                html += `<div class="seat ${cls}" id="seat-${seatId}" data-seat="${seatId}" ${isOccupied ? '' : `onclick="flightApp.selectSeat('${seatId}')"`} title="${seatId}">${isOccupied ? '✕' : seatId}</div>`;
            });
            html += `</div>`;
        }
        map.innerHTML = html;
    }

    generateOccupied(rows, cols) {
        const set = new Set();
        const total = rows * cols.length;
        const count = Math.floor(total * 0.45);
        while (set.size < count) {
            const r = Math.floor(Math.random() * rows) + 1;
            const c = cols[Math.floor(Math.random() * cols.length)];
            set.add(`${r}${c}`);
        }
        return set;
    }

    selectSeat(seatId) {
        const pax = this.passengerCount;
        const idx = this.selectedSeats.indexOf(seatId);

        if (idx !== -1) {
            // Clicking an already-selected seat deselects it
            this.selectedSeats.splice(idx, 1);
            const el = document.getElementById(`seat-${seatId}`);
            if (el) el.classList.remove('selected');
        } else {
            if (this.selectedSeats.length >= pax) {
                // Max seats reached – deselect the earliest picked seat
                const evicted = this.selectedSeats.shift();
                const evictedEl = document.getElementById(`seat-${evicted}`);
                if (evictedEl) evictedEl.classList.remove('selected');
            }
            this.selectedSeats.push(seatId);
            const el = document.getElementById(`seat-${seatId}`);
            if (el) el.classList.add('selected');
        }

        const selected = this.selectedSeats.length;
        const infoEl = document.getElementById('seat-selection-info');
        if (selected === 0) {
            infoEl.textContent = `Please select ${pax} seat${pax > 1 ? 's' : ''} to continue`;
        } else if (selected < pax) {
            infoEl.textContent = `${selected} of ${pax} seats selected – please select ${pax - selected} more`;
        } else {
            infoEl.textContent = `All ${pax} seat${pax > 1 ? 's' : ''} selected: ${this.selectedSeats.join(', ')}`;
        }
        document.getElementById('btn-proceed-passenger').disabled = (selected < pax);
    }

    // ===== PASSENGER DETAILS =====
    openPassengerModal() {
        const f = this.selectedFlight;
        const seatsLabel = this.selectedSeats.join(', ');
        document.getElementById('pass-flight-summary').innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;">
                <div><strong>${f.airline} ${f.id}</strong><br><span style="font-size:0.8rem;color:#64748b;">${f.from} → ${f.to} | Seat${this.passengerCount > 1 ? 's' : ''}: ${seatsLabel}</span></div>
                <div style="font-size:1.1rem;font-weight:800;color:#0284c7;">$${(f.price * this.passengerCount).toLocaleString()}</div>
            </div>
        `;
        const container = document.getElementById('passenger-forms-container');
        container.innerHTML = '';
        for (let i = 1; i <= this.passengerCount; i++) {
            const assignedSeat = this.selectedSeats[i - 1] || 'TBD';
            container.innerHTML += `
                <div class="passenger-block">
                    <div class="passenger-block-title"><i class="fas fa-user"></i> Passenger ${i} &nbsp;<span style="font-size:0.8rem;font-weight:400;color:#64748b;">— Seat <strong>${assignedSeat}</strong></span></div>
                    <div class="form-row">
                        <div class="form-group"><label class="form-label" for="p${i}-fname">First Name *</label><input type="text" id="p${i}-fname" class="form-input" placeholder="First Name" required></div>
                        <div class="form-group"><label class="form-label" for="p${i}-lname">Last Name *</label><input type="text" id="p${i}-lname" class="form-input" placeholder="Last Name" required></div>
                    </div>
                    <div class="form-row">
                        <div class="form-group"><label class="form-label" for="p${i}-dob">Date of Birth *</label><input type="date" id="p${i}-dob" class="form-input" required></div>
                        <div class="form-group"><label class="form-label" for="p${i}-gender">Gender</label>
                            <select id="p${i}-gender" class="form-input"><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group"><label class="form-label" for="p${i}-passport">Passport No. *</label><input type="text" id="p${i}-passport" class="form-input" placeholder="e.g. A12345678" required></div>
                        <div class="form-group"><label class="form-label" for="p${i}-nationality">Nationality</label>
                            <select id="p${i}-nationality" class="form-input"><option>American</option><option>British</option><option>Indian</option><option>Canadian</option><option>Australian</option><option>German</option><option>French</option><option>Japanese</option></select>
                        </div>
                    </div>
                    ${i === 1 ? `<div class="form-group"><label class="form-label" for="p${i}-email">Email (for e-ticket) *</label><input type="email" id="p${i}-email" class="form-input" placeholder="email@example.com" required></div>` : ''}
                    ${i === 1 ? `<div class="form-group"><label class="form-label" for="p${i}-phone">Phone</label><input type="tel" id="p${i}-phone" class="form-input" placeholder="+1 234 567 8900"></div>` : ''}
                </div>
            `;
        }
        this.closeModal('modal-seat');
        this.openModal('modal-passenger');
    }

    // ===== PAYMENT =====
    openPaymentModal() {
        // Validate passenger forms
        let valid = true;
        for (let i = 1; i <= this.passengerCount; i++) {
            const fname = document.getElementById(`p${i}-fname`).value.trim();
            const lname = document.getElementById(`p${i}-lname`).value.trim();
            const passport = document.getElementById(`p${i}-passport`).value.trim();
            if (!fname || !lname || !passport) { valid = false; break; }
        }
        if (!valid) { this.toast('Please fill in all required passenger details', 'error'); return; }

        const f = this.selectedFlight;
        const total = f.price * this.passengerCount;
        const seatsLabel = this.selectedSeats.join(', ');
        document.getElementById('payment-summary').innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;">
                <div><strong>${f.airline} ${f.id}</strong><br><span style="font-size:0.8rem;color:#64748b;">${f.from} → ${f.to} | ${this.passengerCount} passenger(s) | Seat${this.passengerCount > 1 ? 's' : ''}: ${seatsLabel}</span></div>
                <div style="font-size:1.2rem;font-weight:800;color:#0284c7;" id="pay-total">$${total.toLocaleString()}</div>
            </div>
        `;
        this.promoApplied = false;
        document.getElementById('promo-code').value = '';
        document.getElementById('promo-msg').textContent = '';
        document.getElementById('btn-confirm-pay').innerHTML = `<i class="fas fa-lock"></i> Pay $${total.toLocaleString()}`;
        this.closeModal('modal-passenger');
        this.openModal('modal-payment');
    }

    setupPaymentToggle() {
        document.querySelectorAll('input[name="pay-method"]').forEach(radio => {
            radio.addEventListener('change', () => {
                document.getElementById('card-form').style.display = radio.value === 'card' ? 'block' : 'none';
                document.getElementById('upi-form').style.display = radio.value === 'upi' ? 'block' : 'none';
                document.getElementById('netbanking-form').style.display = radio.value === 'netbanking' ? 'block' : 'none';
            });
        });
    }

    setupCardFormatting() {
        const cardNum = document.getElementById('card-number');
        if (cardNum) {
            cardNum.addEventListener('input', e => {
                let v = e.target.value.replace(/\D/g, '').substring(0, 16);
                e.target.value = v.replace(/(.{4})/g, '$1 ').trim();
            });
        }
        const expiry = document.getElementById('card-expiry');
        if (expiry) {
            expiry.addEventListener('input', e => {
                let v = e.target.value.replace(/\D/g, '').substring(0, 4);
                if (v.length >= 2) v = v.substring(0, 2) + '/' + v.substring(2);
                e.target.value = v;
            });
        }
    }

    applyPromo() {
        const code = document.getElementById('promo-code').value.trim().toUpperCase();
        const f = this.selectedFlight;
        const baseTotal = f.price * this.passengerCount;
        const msg = document.getElementById('promo-msg');

        if (this.promoApplied) { msg.innerHTML = '<span style="color:#ef4444;">Promo already applied.</span>'; return; }

        const promos = { 'SAVE10': 0.10, 'SKYHOOK20': 0.20, 'FIRST15': 0.15, 'SUMMER5': 0.05 };
        if (promos[code]) {
            const discount = Math.round(baseTotal * promos[code]);
            const newTotal = baseTotal - discount;
            this.promoApplied = true;
            this.discountedTotal = newTotal;
            msg.innerHTML = `<span style="color:#10b981;"><i class="fas fa-check-circle"></i> Promo applied! You save $${discount}</span>`;
            document.getElementById('pay-total').textContent = `$${newTotal.toLocaleString()}`;
            document.getElementById('btn-confirm-pay').innerHTML = `<i class="fas fa-lock"></i> Pay $${newTotal.toLocaleString()}`;
        } else {
            msg.innerHTML = '<span style="color:#ef4444;"><i class="fas fa-times-circle"></i> Invalid promo code. Try: SAVE10</span>';
        }
    }

    async confirmPayment() {
        const payMethod = document.querySelector('input[name="pay-method"]:checked').value;

        if (payMethod === 'card') {
            const cardName = document.getElementById('card-name').value.trim();
            const cardNum = document.getElementById('card-number').value.trim();
            const expiry = document.getElementById('card-expiry').value.trim();
            const cvv = document.getElementById('card-cvv').value.trim();
            if (!cardName || cardNum.replace(/\s/g, '').length < 16 || expiry.length < 5 || cvv.length < 3) {
                this.toast('Please enter valid card details', 'error'); return;
            }
        }

        const btn = document.getElementById('btn-confirm-pay');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        btn.disabled = true;

        const f = this.selectedFlight;
        const passengers = [];
        for (let i = 1; i <= this.passengerCount; i++) {
            passengers.push({
                name: `${document.getElementById(`p${i}-fname`).value} ${document.getElementById(`p${i}-lname`).value}`,
                passport: document.getElementById(`p${i}-passport`).value,
                dob: document.getElementById(`p${i}-dob`).value,
                seat: this.selectedSeats[i - 1] || 'TBD'
            });
        }

        const total = this.promoApplied ? this.discountedTotal : f.price * this.passengerCount;
        const booking = await this.api.post('bookings', {
            flightId: f.id,
            airline: f.airline,
            from: f.from, fromCode: f.fromCode,
            to: f.to, toCode: f.toCode,
            dep: f.dep, arr: f.arr,
            duration: f.duration,
            seat: this.selectedSeats.join(', '),   // all seats joined
            seats: [...this.selectedSeats],         // per-passenger array
            passengers,
            total,
            payMethod,
            status: 'confirmed',
            date: document.getElementById('depDate').value
        });

        this.lastBooking = booking;
        this.closeModal('modal-payment');
        this.showConfirmation(booking, f);
        document.getElementById('sidebar-username').textContent = passengers[0].name.split(' ')[0];
    }

    showConfirmation(booking, f) {
        const pnr = booking.id.toUpperCase();
        const seatsLabel = this.selectedSeats.join(', ');
        const pax = this.passengerCount;
        // Build per-passenger seat rows
        const passengerRows = booking.passengers.map((p, idx) =>
            `<div class="ticket-detail-item"><span>Passenger ${idx + 1}</span>${p.name} — Seat <strong>${this.selectedSeats[idx] || 'TBD'}</strong></div>`
        ).join('');
        document.getElementById('confirmation-body').innerHTML = `
            <div class="ticket-card">
                <div style="text-align:center;font-size:0.75rem;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;">Booking Reference</div>
                <div class="ticket-pnr">${pnr}</div>
                <div class="ticket-route">
                    <div class="ticket-city">${f.fromCode}</div>
                    <div style="color:#0284c7;font-size:1.5rem;">✈</div>
                    <div class="ticket-city">${f.toCode}</div>
                </div>
                <div class="ticket-details">
                    <div class="ticket-detail-item"><span>Flight</span>${f.airline} ${f.id}</div>
                    <div class="ticket-detail-item"><span>Seat${pax > 1 ? 's' : ''}</span>${seatsLabel}</div>
                    <div class="ticket-detail-item"><span>Departure</span>${f.dep}</div>
                    <div class="ticket-detail-item"><span>Arrival</span>${f.arr}</div>
                    <div class="ticket-detail-item"><span>Date</span>${document.getElementById('depDate').value}</div>
                    <div class="ticket-detail-item"><span>Passengers</span>${pax}</div>
                    <div class="ticket-detail-item"><span>Class</span>${f.class.charAt(0).toUpperCase() + f.class.slice(1)}</div>
                    <div class="ticket-detail-item"><span>Total Paid</span>$${booking.total.toLocaleString()}</div>
                    ${passengerRows}
                </div>
            </div>
            <div style="background:#f0fdf4;border-radius:10px;padding:0.75rem 1rem;border:1px solid #bbf7d0;font-size:0.85rem;color:#065f46;">
                <i class="fas fa-envelope"></i> E-ticket sent to your email. Check-in opens 24 hours before departure.
            </div>
        `;
        this.openModal('modal-confirm');
    }

    downloadTicket() {
        if (!this.lastBooking) return;
        const b = this.lastBooking;
        const content = `SKYHOOK AIRLINES - E-TICKET\n${'='.repeat(40)}\nPNR: ${b.id.toUpperCase()}\nFlight: ${b.airline} ${b.flightId}\nFrom: ${b.from} (${b.fromCode})\nTo: ${b.to} (${b.toCode})\nDate: ${b.date}\nDeparture: ${b.dep} | Arrival: ${b.arr}\nSeat: ${b.seat}\nPassenger: ${b.passengers[0].name}\nTotal: $${b.total}\nStatus: CONFIRMED\n${'='.repeat(40)}\nThank you for flying with SkyHook!`;
        const blob = new Blob([content], { type: 'text/plain' });
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
        a.download = `SkyHook-${b.id.toUpperCase()}.txt`; a.click();
    }

    viewBookings() {
        this.closeModal('modal-confirm');
        this.showTab('tab-bookings');
        this.renderMyBookings();
    }

    // ===== MY BOOKINGS =====
    async renderMyBookings() {
        const container = document.getElementById('bookings-container');
        container.innerHTML = `<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i><p style="margin-top:1rem;">Loading your bookings...</p></div>`;
        await this.delay(800);
        const bookings = await this.api.get('bookings');
        if (bookings.length === 0) {
            container.innerHTML = `<div class="empty-state"><i class="fas fa-ticket-alt"></i><p>No bookings found.<br>Search and book a flight to get started!</p></div>`;
            return;
        }
        container.innerHTML = bookings.map(b => {
            const statusClass = b.status === 'confirmed' ? 'status-confirmed' : b.status === 'cancelled' ? 'status-cancelled' : 'status-checkedin';
            const statusLabel = b.status === 'confirmed' ? 'Confirmed' : b.status === 'cancelled' ? 'Cancelled' : 'Checked In';
            return `
            <div class="booking-card" id="booking-${b.id}">
                <div class="booking-card-header">
                    <div>
                        <div class="booking-pnr">PNR: ${b.id.toUpperCase()}</div>
                        <div style="color:white;font-weight:700;font-size:1rem;">${b.airline} ${b.flightId || b.id}</div>
                    </div>
                    <span class="booking-status ${statusClass}">${statusLabel}</span>
                </div>
                <div class="booking-card-body">
                    <div class="booking-route">
                        <div class="booking-city">${b.fromCode || b.from}</div>
                        <div class="booking-arrow"><i class="fas fa-arrow-right"></i></div>
                        <div class="booking-city">${b.toCode || b.to}</div>
                    </div>
                    <div class="booking-meta">
                        <div class="booking-meta-item"><strong>${b.dep}</strong>Departure</div>
                        <div class="booking-meta-item"><strong>${b.arr}</strong>Arrival</div>
                        <div class="booking-meta-item"><strong>${b.seat || 'N/A'}</strong>Seat</div>
                        <div class="booking-meta-item"><strong>${b.date || 'N/A'}</strong>Date</div>
                        <div class="booking-meta-item"><strong>$${b.total || 0}</strong>Total Paid</div>
                        <div class="booking-meta-item"><strong>${b.passengers ? b.passengers[0].name : 'N/A'}</strong>Passenger</div>
                    </div>
                    ${b.status !== 'cancelled' ? `
                    <div class="booking-actions">
                        <button class="btn-sm btn-sm-primary" id="btn-checkin-${b.id}" onclick="flightApp.checkInBooking('${b.id}')"><i class="fas fa-clipboard-check"></i> Check-In</button>
                        <button class="btn-sm btn-sm-secondary" onclick="flightApp.downloadBookingTicket('${b.id}')"><i class="fas fa-download"></i> E-Ticket</button>
                        <button class="btn-sm btn-sm-danger" id="btn-cancel-${b.id}" onclick="flightApp.promptCancel('${b.id}')"><i class="fas fa-times"></i> Cancel</button>
                    </div>` : ''}
                </div>
            </div>`;
        }).join('');
    }

    async checkInBooking(id) {
        const btn = document.getElementById(`btn-checkin-${id}`);
        if (btn) { btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; btn.disabled = true; }
        await this.delay(1000);
        const bookings = await this.api.get('bookings');
        const b = bookings.find(x => x.id === id);
        if (b && b.status === 'confirmed') {
            await this.api.put('bookings', id, { status: 'checked-in' });
            this.toast('Check-in successful! Boarding pass ready.', 'success');
            this.renderMyBookings();
        } else {
            this.toast('Already checked in or booking not found.', 'info');
        }
    }

    promptCancel(id) {
        this.cancelTarget = id;
        document.getElementById('cancel-pnr').textContent = id.toUpperCase();
        this.openModal('modal-cancel');
    }

    async confirmCancel() {
        if (!this.cancelTarget) return;
        await this.api.put('bookings', this.cancelTarget, { status: 'cancelled' });
        this.closeModal('modal-cancel');
        this.toast('Booking cancelled. Refund will be processed in 5-7 days.', 'warning');
        this.cancelTarget = null;
        this.renderMyBookings();
    }

    downloadBookingTicket(id) {
        this.toast('Downloading e-ticket...', 'info');
        setTimeout(() => this.toast('E-ticket downloaded!', 'success'), 1000);
    }

    // ===== CHECK-IN TAB =====
    async doCheckIn() {
        const pnr = document.getElementById('ci-booking-ref').value.trim().toUpperCase();
        const lastName = document.getElementById('ci-last-name').value.trim().toLowerCase();
        const result = document.getElementById('checkin-result');

        if (!pnr || !lastName) { this.toast('Please enter PNR and last name', 'error'); return; }

        const btn = document.getElementById('btn-checkin');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
        btn.disabled = true;
        await this.delay(1200);
        btn.innerHTML = '<i class="fas fa-search"></i> Find My Booking';
        btn.disabled = false;

        const bookings = await this.api.get('bookings');
        const booking = bookings.find(b => b.id.toUpperCase() === pnr && b.passengers && b.passengers[0].name.toLowerCase().includes(lastName));

        if (!booking) {
            result.innerHTML = `<div style="background:#fee2e2;border-radius:10px;padding:1rem;color:#991b1b;"><i class="fas fa-times-circle"></i> Booking not found. Please check your PNR and last name.</div>`;
            return;
        }

        result.innerHTML = `
            <div class="booking-card">
                <div class="booking-card-header">
                    <div><div class="booking-pnr">PNR: ${booking.id.toUpperCase()}</div><div style="color:white;font-weight:700;">${booking.airline} | ${booking.from} → ${booking.to}</div></div>
                    <span class="booking-status status-confirmed">Found</span>
                </div>
                <div class="booking-card-body">
                    <div class="booking-meta">
                        <div class="booking-meta-item"><strong>${booking.dep}</strong>Departure</div>
                        <div class="booking-meta-item"><strong>${booking.seat}</strong>Seat</div>
                        <div class="booking-meta-item"><strong>${booking.passengers[0].name}</strong>Passenger</div>
                    </div>
                    <div class="booking-actions">
                        <button class="btn-sm btn-sm-primary" onclick="flightApp.checkInBooking('${booking.id}')"><i class="fas fa-clipboard-check"></i> Complete Check-In</button>
                    </div>
                </div>
            </div>`;
    }

    // ===== FLIGHT STATUS =====
    async checkStatus() {
        const flightNo = document.getElementById('status-flight-no').value.trim().toUpperCase();
        const result = document.getElementById('status-result');

        if (!flightNo) { this.toast('Please enter a flight number', 'error'); return; }

        const btn = document.getElementById('btn-status');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking...';
        btn.disabled = true;
        await this.delay(1000);
        btn.innerHTML = '<i class="fas fa-satellite-dish"></i> Check Status';
        btn.disabled = false;

        const flights = await this.api.get('flights');
        const flight = flights.find(f => f.id.toUpperCase() === flightNo);

        if (!flight) {
            result.innerHTML = `<div style="background:#fee2e2;border-radius:10px;padding:1rem;color:#991b1b;"><i class="fas fa-times-circle"></i> Flight ${flightNo} not found.</div>`;
            return;
        }

        const statuses = ['On Time', 'On Time', 'On Time', 'Delayed 20 min', 'Boarding', 'Cancelled'];
        const statusText = statuses[Math.floor(Math.random() * statuses.length)];
        const statusClass = statusText.includes('Delayed') ? 'status-delayed' : statusText === 'Cancelled' ? 'status-cancelled-badge' : statusText === 'Boarding' ? 'status-boarding' : 'status-on-time';
        const gate = `${String.fromCharCode(65 + Math.floor(Math.random() * 8))}${Math.floor(Math.random() * 30) + 1}`;

        result.innerHTML = `
            <div class="booking-card">
                <div class="booking-card-header">
                    <div><div class="booking-pnr">${flight.id}</div><div style="color:white;font-weight:700;">${flight.airline} | ${flight.from} → ${flight.to}</div></div>
                    <span class="booking-status status-confirmed">Live</span>
                </div>
                <div class="booking-card-body">
                    <div style="margin-bottom:0.75rem;"><span class="status-badge ${statusClass}"><i class="fas fa-circle" style="font-size:0.5rem;"></i> ${statusText}</span></div>
                    <div class="booking-meta">
                        <div class="booking-meta-item"><strong>${flight.dep}</strong>Scheduled Dep.</div>
                        <div class="booking-meta-item"><strong>${flight.arr}</strong>Scheduled Arr.</div>
                        <div class="booking-meta-item"><strong>Gate ${gate}</strong>Departure Gate</div>
                        <div class="booking-meta-item"><strong>${flight.duration}</strong>Duration</div>
                        <div class="booking-meta-item"><strong>${flight.stops === 0 ? 'Non-stop' : flight.stops + ' Stop'}</strong>Stops</div>
                        <div class="booking-meta-item"><strong>${flight.seats} seats</strong>Available</div>
                    </div>
                </div>
            </div>`;
    }

    // ===== PROFILE =====
    loadProfile() {
        const p = JSON.parse(localStorage.getItem('skyhook_profile') || '{}');
        if (p.fname) document.getElementById('p-fname').value = p.fname;
        if (p.lname) document.getElementById('p-lname').value = p.lname;
        if (p.email) document.getElementById('p-email').value = p.email;
        if (p.phone) document.getElementById('p-phone').value = p.phone;
        if (p.passport) document.getElementById('p-passport').value = p.passport;
        if (p.fname) document.getElementById('sidebar-username').textContent = p.fname;
    }

    saveProfile() {
        const p = {
            fname: document.getElementById('p-fname').value,
            lname: document.getElementById('p-lname').value,
            email: document.getElementById('p-email').value,
            phone: document.getElementById('p-phone').value,
            passport: document.getElementById('p-passport').value
        };
        localStorage.setItem('skyhook_profile', JSON.stringify(p));
        if (p.fname) document.getElementById('sidebar-username').textContent = p.fname;
        this.toast('Profile saved successfully!', 'success');
    }

    // ===== MODAL HELPERS =====
    openModal(id) { document.getElementById(id).classList.add('open'); }
    closeModal(id) { document.getElementById(id).classList.remove('open'); }

    // ===== UTILITIES =====
    toast(msg, type = 'success') {
        const container = document.getElementById('toast-container');
        const el = document.createElement('div');
        el.className = `toast ${type}`;
        el.innerHTML = msg;
        container.appendChild(el);
        setTimeout(() => el.remove(), 3500);
    }

    delay(ms) { return new Promise(r => setTimeout(r, ms)); }
}

window.flightApp = new FlightApp();
