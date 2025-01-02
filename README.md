# Connect Unified Login System

`connect-unified-login-system` is an NPM package that helps websites seamlessly integrate with the [Unified Login System](https://unified-login-system.gvishnu.in) for user authentication purposes. By using this package, developers can enable secure, efficient, and user-friendly authentication for their applications.

## Features

- Simple integration with the Unified Login System.
- Facilitates secure authentication using unique public keys.
- Streamlined communication with the Unified Login System's API.
- Supports JWT token-based authentication for backend validation.

## Installation

Install the package via npm:

```bash
npm install connect-unified-login-system
```

## Usage

Import the package and use it in your code to connect to the Unified Login System.

### Example:

```javascript
import { connectToUnifiedLoginSystem } from 'connect-unified-login-system';

const handleUnifiedLoginSystem = async () => {
    const publicKey = "xx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"; // Replace with your own public key
    
    try {
        const response = await connectToUnifiedLoginSystem({ publicKey });
        if (response.isError) {
            console.error("Error from Unified Login System:", response.msg);
        } else {
            console.log("User Data:", response);
            // Send authToken to your backend for validation
        }
    } catch (error) {
        console.error("Error connecting to Unified Login System:", error);
    }
};

handleUnifiedLoginSystem();
```

## API

### `connectToUnifiedLoginSystem({ publicKey, isProd })`

#### Parameters
- `publicKey` (string, required): Your unique public key provided by the Unified Login System. It is used to authenticate your application.
- `isProd` (boolean, optional): If you want to return response to your Production URL provide `true`.

#### Returns
A Promise that resolves to an object containing user data or an error message.

#### Example Successful Response
```json
{
    "name": "John Doe",
    "emailId": "john.doe@example.com",
    "isError": false,
    "authToken": "ey..." // JWT token to pass to your backend for validation
}
```

#### Example Error Response
```json
{
    "isError": true,
    "msg": "Popup was blocked. Please allow popups for this site."
}
```

## How It Works

1. The package opens a popup window where the user can log in to the Unified Login System.
2. On successful login and granting permission, the system sends user data (name, email) and an `authToken` back to your website via the popup.
3. You can send the `authToken` to your backend for validation using the Unified Login System's third-party token authentication API.
4. If the user closes the popup or denies permission, you will receive an error response.

## Getting Started

1. Sign up and register your website on the [Unified Login System](https://unified-login-system.gvishnu.in).
2. Obtain your unique public key.
3. Use this package to integrate Unified Login System into your application.

## Requirements

- Node.js version 12 or above.
- A valid public key provided by the Unified Login System.

## Support

For any questions or issues, please contact [Unified Login System Support](https://unified-login-system.gvishnu.in/contact) or open an issue on this repository.

## License

This package is licensed under the Apache-2.0 License. See the LICENSE file for more details.

