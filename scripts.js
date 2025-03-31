// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
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