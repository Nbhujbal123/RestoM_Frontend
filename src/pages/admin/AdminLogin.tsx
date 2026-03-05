import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaLock, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa'

const AdminLogin: React.FC = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 800))

    // Get stored admin profile for authentication
    const storedProfile = localStorage.getItem('adminProfile')
    let isValid = false
    
    if (storedProfile) {
      const profile = JSON.parse(storedProfile)
      // Check against stored username/password
      if (credentials.username === profile.username && credentials.password === profile.password) {
        isValid = true
      }
    } else {
      // Default credentials if no profile set
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        isValid = true
      }
    }

    if (isValid) {
      localStorage.setItem('adminAuthenticated', 'true')
      navigate('/admin/dashboard')
    } else {
      setError('Invalid username or password')
    }
    setIsLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      // background: 'linear-gradient(135deg, #FF6A00 0%, #FF9900 50%, #FF6A00 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(79, 70, 229, 0.2)',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '420px'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(90deg, #4F46E5, #6366F1)',
          padding: '40px 30px 30px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 15px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}>
            <span style={{ fontSize: '36px' }}>🍽️</span>
          </div>
          <h2 style={{ color: 'white', margin: 0, fontWeight: 'bold', fontSize: '1.8rem' }}>
            RestoM Admin
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', margin: '10px 0 0', fontSize: '0.95rem' }}>
            Sign in to manage your restaurant
          </p>
        </div>

        {/* Form Body */}
        <div style={{ padding: '30px' }}>
          {error && (
            <div style={{
              background: '#fee2e2',
              color: '#dc2626',
              padding: '12px 15px',
              borderRadius: '10px',
              marginBottom: '20px',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Username Field */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#374151',
                fontSize: '0.9rem'
              }}>
                Username
              </label>
              <div style={{
                position: 'relative'
              }}>
                <FaUser style={{
                  position: 'absolute',
                  left: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af'
                }} />
                <input
                  type="text"
                  name="username"
                  value={credentials.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                  required
                  style={{
                    width: '100%',
                    padding: '14px 14px 14px 45px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#FF6A00'
                    e.target.style.boxShadow = '0 0 0 3px rgba(255,106,0,0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#374151',
                fontSize: '0.9rem'
              }}>
                Password
              </label>
              <div style={{
                position: 'relative'
              }}>
                <FaLock style={{
                  position: 'absolute',
                  left: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af'
                }} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                  style={{
                    width: '100%',
                    padding: '14px 45px 14px 45px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#FF6A00'
                    e.target.style.boxShadow = '0 0 0 3px rgba(255,106,0,0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb'
                    e.target.style.boxShadow = 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#9ca3af'
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '15px',
                background: isLoading ? '#9ca3af' : 'linear-gradient(90deg, #4F46E5, #6366F1)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isLoading ? 'none' : '0 4px 15px rgba(79,70,229,0.4)'
              }}
            >
              {isLoading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <FaLock style={{ marginRight: '8px' }} />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div style={{
            marginTop: '25px',
            padding: '15px',
            background: '#f9fafb',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <p style={{ color: '#6b7280', margin: '0 0 5px', fontSize: '0.85rem' }}>
              Demo Credentials
            </p>
            <p style={{ color: '#374151', margin: 0, fontSize: '0.9rem', fontWeight: '600' }}>
              Username: <span style={{ color: '#4F46E5' }}>admin</span> | Password: <span style={{ color: '#4F46E5' }}>admin123</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '15px',
          textAlign: 'center',
          borderTop: '1px solid #e5e7eb'
        }}>
          <a 
            href="/menu" 
            style={{
              color: '#6b7280',
              textDecoration: 'none',
              fontSize: '0.9rem'
            }}
          >
            ← Back to Customer Menu
          </a>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
