import { useState } from 'react'
import { authService } from '../services/authService'

const ApiTest = () => {
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    setResult('')
    
    try {
      // Simple test with a basic request
      const response = await fetch('http://localhost:3000/auth/ping')
      if (response.ok) {
        setResult('✅ API Gateway connection successful!')
      } else {
        setResult(`❌ Connection failed: ${response.status} ${response.statusText}`)
      }
    } catch (error) {
      setResult(`❌ Connection failed: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const testLogin = async () => {
    setLoading(true)
    setResult('')
    
    try {
      // Test with dummy credentials (will fail but shows endpoint works)
      await authService.login('test@example.com', 'password123')
      setResult('✅ Login endpoint works (unexpected success)')
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setResult(`🔍 Login endpoint responded: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>API Connection Test</h2>
      
      <div style={{ marginBottom: '1rem' }}>
        <button 
          onClick={testConnection} 
          disabled={loading}
          style={{ marginRight: '1rem', padding: '0.5rem 1rem' }}
        >
          Test Gateway Connection
        </button>
        
        <button 
          onClick={testLogin} 
          disabled={loading}
          style={{ padding: '0.5rem 1rem' }}
        >
          Test Auth Endpoint
        </button>
      </div>

      {loading && <p>Testing...</p>}
      
      <pre style={{ 
        background: '#f5f5f5', 
        padding: '1rem', 
        borderRadius: '4px',
        whiteSpace: 'pre-wrap'
      }}>
        {result || 'Click a button to test...'}
      </pre>
    </div>
  )
}

export default ApiTest
