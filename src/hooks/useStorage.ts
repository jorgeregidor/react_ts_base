export default function useStorage() {
    
    const setTokens = (accessToken: string, refreshToken: string): void => {
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
    }

    const getAccessToken = (): string | null => {
        return localStorage.getItem('accessToken')
    }

    const getRefreshToken = (): string | null => {
        return localStorage.getItem('refreshToken')
    }
  
    const cleanTokens = (): void => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  
  
    const isLogged = (): boolean => {
      return Boolean(localStorage.getItem('accessToken'))
    }
  
  
    return {
      setTokens,
      getAccessToken,
      getRefreshToken, 
      cleanTokens,
      isLogged
    }
  }