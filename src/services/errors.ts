

const ErrorsHandling =  (page, error) => {

   const login = (error) => {
    switch (error?.response?.status) {
        case 400:
          return "errors_handling.login.bad_request";
        case 500:
        default:
            return "errors_handling.common.unknown";
      }
    }

    const forgot_password = (error) => {
      switch (error?.response?.status) {
          case 404:
            return "errors_handling.forgot_password.email_not_exist";
          default:
              return "errors_handling.common.unknown";
      }
    }
    
    const reset_password = (error) => {
      switch (error?.response?.status) {
          case 403:
          case 404:
            return "errors_handling.reset_password.not_valid_token";
          case 422:
            return "errors_handling.reset_password.bad_request"
          default:
              return "errors_handling.common.unknown";
      }
    }

    const sign_up = (error) => {
      switch (error?.response?.status) {
          case 400:
            return "errors_handling.sign_up.bad_request";
          case 422:
              error = error?.request?.response || ''
              if (error.includes('Email')){
                return "errors_handling.sign_up.email_exist";
              } else if (error.includes('Password')){
                return "errors_handling.sign_up.email_exist";
              } else {
                return "errors_handling.sign_up.bad_request"
              }
          case 500:
          default:
              return "errors_handling.common.unknown";
        }
      }

      const user_update_email = (error) => {
        switch (error?.response?.status) {
            case 422:
              return "errors_handling.user_update_email.bad_request";
            case 403:
                return "errors_handling.common.forbidden";
            case 500:
            default:
                return "errors_handling.common.unknown";
          }
        }

        const user_update_password = (error) => {
          switch (error?.response?.status) {
              case 422:
                return "errors_handling.user_update_password.bad_request";
              case 403:
                  return "errors_handling.common.forbidden";
              case 500:
              default:
                  return "errors_handling.common.unknown";
            }
          }

          const cancel_account = (error) => {
            switch (error?.response?.status) {
                case 403:
                    return "errors_handling.common.forbidden";
                case 500:
                default:
                    return "errors_handling.common.unknown";
              }
            }
    
    

    switch (page) {
        case "login":
          return login(error)
        case "sign_up":
          return sign_up(error)
        case "forgot_password":
          return forgot_password(error)
        case "reset_password":
          return reset_password(error)
        case "user_update_email":
          return user_update_email(error)
        case "user_update_password":
            return user_update_password(error)
        case "cancel_account":
            return cancel_account(error)
        default:
          return "errors_handling.common.unknown"
      }
}




export default ErrorsHandling