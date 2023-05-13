import { useAuthentication } from '@/app/shared'
import { EmailAuthenticationStrategy, AppleAuthenticationStrategy } from '@/services/auth/strategies'


export async function initAuth() {
  const auth = useAuthentication()
  auth.registerStrategy('email', new EmailAuthenticationStrategy())
  auth.registerStrategy('apple', new AppleAuthenticationStrategy())
}
