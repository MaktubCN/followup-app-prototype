// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize notifications
    initializeNotifications();
    
    // Sample notifications data - in real app, this would come from backend
    const notifications = [
        {
            id: 1,
            type: 'appointment',
            title: 'Upcoming Appointment',
            message: 'Your appointment with Dr. Smith is in 2 days',
            time: '2024-01-20 10:30:00',
            status: 'unread',
            details: {
                doctorName: 'Dr. Smith',
                specialty: 'Cardiologist',
                location: 'Main Clinic',
                appointmentTime: '2024-01-20 10:30:00'
            }
        },
        {
            id: 2,
            type: 'bp_measurement',
            title: 'Blood Pressure Measurement Due',
            message: 'Time for your daily blood pressure measurement',
            time: '2024-01-18 09:00:00',
            status: 'unread',
            details: {
                lastMeasurement: '2024-01-17 09:15:00',
                frequency: 'daily',
                nextDue: '2024-01-18 09:00:00'
            }
        },
        {
            id: 3,
            type: 'monthly_report',
            title: 'December Blood Pressure Report',
            message: 'Your monthly blood pressure report is ready',
            time: '2024-01-01 00:00:00',
            status: 'unread',
            details: {
                period: 'December 2023',
                averageSystolic: 122,
                averageDiastolic: 78,
                totalReadings: 31,
                trend: 'stable',
                recommendations: [
                    'Continue with current medication regimen',
                    'Maintain regular exercise routine',
                    'Keep monitoring salt intake'
                ]
            }
        }
    ];
    
    // Update notification count
    updateNotificationCount(notifications);
    // Login/Register Tab Switching
    const tabs = document.querySelectorAll('.tab');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and panes
            tabs.forEach(t => t.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding pane
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Form Validation
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;
            
            if (username && password) {
                // Simulate login - in a real app, this would be an API call
                console.log('Login attempt:', { username, password });
                
                // Redirect to dashboard after successful login
                window.location.href = 'dashboard.html';
            } else {
                alert('Please fill in all fields');
            }
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const fullname = document.getElementById('register-fullname').value;
            const email = document.getElementById('register-email').value;
            const phone = document.getElementById('register-phone').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            const terms = document.getElementById('terms').checked;
            
            if (fullname && email && phone && password && confirmPassword) {
                if (password !== confirmPassword) {
                    alert('Passwords do not match');
                    return;
                }
                
                if (!terms) {
                    alert('Please agree to the terms and conditions');
                    return;
                }
                
                // Simulate registration - in a real app, this would be an API call
                console.log('Registration attempt:', { fullname, email, phone, password });
                
                // Redirect to dashboard after successful registration
                window.location.href = 'dashboard.html';
            } else {
                alert('Please fill in all fields');
            }
        });
    }
});

// Navigation Menu Toggle (for responsive design)
function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

// Chart.js Integration for Blood Pressure Chart
function initBPChart() {
    const bpChartElement = document.getElementById('bp-chart');
    
    if (bpChartElement && typeof Chart !== 'undefined') {
        const ctx = bpChartElement.getContext('2d');
        
        // Sample data - in a real app, this would come from an API
        const data = {
            labels: ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5', 'Jan 6', 'Jan 7'],
            datasets: [
                {
                    label: 'Systolic',
                    data: [120, 118, 125, 130, 128, 122, 119],
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.4
                },
                {
                    label: 'Diastolic',
                    data: [80, 78, 82, 85, 84, 80, 79],
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    tension: 0.4
                }
            ]
        };
        
        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    y: {
                        min: 60,
                        max: 160,
                        ticks: {
                            stepSize: 20
                        }
                    }
                }
            }
        };
        
        new Chart(ctx, config);
    }
}

// Teleconsultation Chat Functions
function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();
    
    if (message) {
        const chatMessages = document.querySelector('.chat-messages');
        const messageElement = document.createElement('div');
        messageElement.className = 'message sent';
        messageElement.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
                <span class="time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
        `;
        
        chatMessages.appendChild(messageElement);
        chatInput.value = '';
        
        // Auto scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate doctor response after 1 second
        setTimeout(() => {
            const responseElement = document.createElement('div');
            responseElement.className = 'message received';
            responseElement.innerHTML = `
                <div class="avatar"><img src="assets/doctor-avatar.jpg" alt="Doctor"></div>
                <div class="message-content">
                    <p>Thank you for your message. I'll check your records and get back to you shortly.</p>
                    <span class="time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
            `;
            
            chatMessages.appendChild(responseElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
}

// Medication Search Function
function searchMedication() {
    const searchInput = document.getElementById('medication-search');
    const searchTerm = searchInput.value.toLowerCase().trim();
    const medicationItems = document.querySelectorAll('.medication-item');
    
    medicationItems.forEach(item => {
        const medicationName = item.querySelector('h3').textContent.toLowerCase();
        if (medicationName.includes(searchTerm) || searchTerm === '') {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Notification System Functions
function initializeNotifications() {
    const notificationBell = document.querySelector('.notification-bell');
    if (notificationBell) {
        notificationBell.addEventListener('click', showNotificationPanel);
    }
}

function updateNotificationCount(notifications) {
    const unreadCount = notifications.filter(n => n.status === 'unread').length;
    const countElement = document.querySelector('.notification-count');
    if (countElement) {
        countElement.textContent = unreadCount;
        countElement.style.display = unreadCount > 0 ? 'block' : 'none';
    }
}

function showNotificationPanel() {
    // Create notification panel if it doesn't exist
    let panel = document.getElementById('notification-panel');
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'notification-panel';
        panel.className = 'notification-panel';
        document.body.appendChild(panel);
    }

    // Update panel content
    panel.innerHTML = `
        <div class="notification-header">
            <h3>Notifications</h3>
            <button onclick="closeNotificationPanel()" class="close-btn">&times;</button>
        </div>
        <div class="notification-list">
            ${notifications.map(notification => `
                <div class="notification-item ${notification.status}" onclick="handleNotificationClick(${notification.id})">
                    <div class="notification-icon">
                        ${getNotificationIcon(notification.type)}
                    </div>
                    <div class="notification-content">
                        <h4>${notification.title}</h4>
                        <p>${notification.message}</p>
                        <span class="notification-time">${formatNotificationTime(notification.time)}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    // Show panel
    panel.style.display = 'block';
}

function closeNotificationPanel() {
    const panel = document.getElementById('notification-panel');
    if (panel) {
        panel.style.display = 'none';
    }
}

function getNotificationIcon(type) {
    const icons = {
        appointment: '<i class="fas fa-calendar-alt"></i>',
        bp_measurement: '<i class="fas fa-heartbeat"></i>',
        monthly_report: '<i class="fas fa-chart-line"></i>'
    };
    return icons[type] || '<i class="fas fa-bell"></i>';
}

function formatNotificationTime(timeString) {
    const time = new Date(timeString);
    const now = new Date();
    const diff = now - time;

    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff/60000)} minutes ago`;
    if (diff < 86400000) return `${Math.floor(diff/3600000)} hours ago`;
    if (diff < 604800000) return `${Math.floor(diff/86400000)} days ago`;
    
    return time.toLocaleDateString();
}

function handleNotificationClick(notificationId) {
    const notification = notifications.find(n => n.id === notificationId);
    if (!notification) return;

    // Mark notification as read
    notification.status = 'read';
    updateNotificationCount(notifications);

    // Show detailed content based on notification type
    switch(notification.type) {
        case 'appointment':
            showAppointmentDetails(notification);
            break;
        case 'bp_measurement':
            showBPMeasurementReminder(notification);
            break;
        case 'monthly_report':
            showMonthlyReport(notification);
            break;
    }
}

function showAppointmentDetails(notification) {
    const modal = createModal('Appointment Details');
    modal.querySelector('.modal-body').innerHTML = `
        <div class="appointment-details">
            <p><strong>Doctor:</strong> ${notification.details.doctorName}</p>
            <p><strong>Specialty:</strong> ${notification.details.specialty}</p>
            <p><strong>Location:</strong> ${notification.details.location}</p>
            <p><strong>Time:</strong> ${new Date(notification.details.appointmentTime).toLocaleString()}</p>
            <div class="countdown">
                <p>Time until appointment:</p>
                <div id="appointment-countdown"></div>
            </div>
        </div>
    `;
    startAppointmentCountdown(notification.details.appointmentTime);
}

function showBPMeasurementReminder(notification) {
    const modal = createModal('Blood Pressure Measurement Reminder');
    modal.querySelector('.modal-body').innerHTML = `
        <div class="bp-reminder">
            <p><strong>Last Measurement:</strong> ${new Date(notification.details.lastMeasurement).toLocaleString()}</p>
            <p><strong>Frequency:</strong> ${notification.details.frequency}</p>
            <p><strong>Next Due:</strong> ${new Date(notification.details.nextDue).toLocaleString()}</p>
            <button class="btn" onclick="openMeasurementModal()">Take Measurement Now</button>
        </div>
    `;
}

function showMonthlyReport(notification) {
    const modal = createModal('Monthly Blood Pressure Report');
    modal.querySelector('.modal-body').innerHTML = `
        <div class="monthly-report">
            <h4>${notification.details.period} Report</h4>
            <div class="report-stats">
                <div class="stat-item">
                    <label>Average Systolic</label>
                    <span>${notification.details.averageSystolic} mmHg</span>
                </div>
                <div class="stat-item">
                    <label>Average Diastolic</label>
                    <span>${notification.details.averageDiastolic} mmHg</span>
                </div>
                <div class="stat-item">
                    <label>Total Readings</label>
                    <span>${notification.details.totalReadings}</span>
                </div>
                <div class="stat-item">
                    <label>Trend</label>
                    <span>${notification.details.trend}</span>
                </div>
            </div>
            <div class="recommendations">
                <h5>Recommendations:</h5>
                <ul>
                    ${notification.details.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

function createModal(title) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body"></div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';
    return modal;
}

function startAppointmentCountdown(appointmentTime) {
    const countdownElement = document.getElementById('appointment-countdown');
    if (!countdownElement) return;

    const appointment = new Date(appointmentTime);
    const countdown = setInterval(() => {
        const now = new Date();
        const diff = appointment - now;

        if (diff <= 0) {
            clearInterval(countdown);
            countdownElement.innerHTML = 'Appointment time has arrived!';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m`;
    }, 1000);
}

// Appointment Booking Functions
function filterDoctors() {
    const specialtyFilter = document.getElementById('specialty-filter');
    const selectedSpecialty = specialtyFilter.value;
    const doctorCards = document.querySelectorAll('.doctor-card');
    
    doctorCards.forEach(card => {
        if (selectedSpecialty === 'all' || card.getAttribute('data-specialty') === selectedSpecialty) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function bookAppointment(doctorId, doctorName) {
    const modal = document.getElementById('appointment-modal');
    const doctorNameElement = document.getElementById('selected-doctor-name');
    
    if (modal && doctorNameElement) {
        doctorNameElement.textContent = doctorName;
        modal.style.display = 'block';
        document.getElementById('doctor-id').value = doctorId;
    }
}

function closeModal() {
    const modal = document.getElementById('appointment-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function confirmAppointment() {
    const date = document.getElementById('appointment-date').value;
    const time = document.getElementById('appointment-time').value;
    const type = document.getElementById('appointment-type').value;
    const doctorId = document.getElementById('doctor-id').value;
    
    if (date && time && type) {
        // In a real app, this would be an API call
        console.log('Booking appointment:', { doctorId, date, time, type });
        
        // Show confirmation
        alert('Appointment booked successfully!');
        closeModal();
        
        // Add to upcoming appointments
        const upcomingAppointments = document.querySelector('.upcoming-appointments');
        if (upcomingAppointments) {
            const doctorName = document.getElementById('selected-doctor-name').textContent;
            const appointmentElement = document.createElement('div');
            appointmentElement.className = 'appointment-card';
            appointmentElement.innerHTML = `
                <div class="appointment-info">
                    <h3>Dr. ${doctorName}</h3>
                    <p><i class="fas fa-calendar"></i> ${date} at ${time}</p>
                    <p><i class="fas fa-stethoscope"></i> ${type}</p>
                </div>
                <div class="appointment-actions">
                    <button class="btn btn-outline"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-outline"><i class="fas fa-times"></i></button>
                </div>
            `;
            
            upcomingAppointments.appendChild(appointmentElement);
        }
    } else {
        alert('Please fill in all appointment details');
    }
}