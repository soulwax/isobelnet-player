# Windows Code Signing for Electron Builds

This project uses `@electron/windows-sign` for code signing Windows builds. Code signing is **required** for production releases to avoid Windows SmartScreen warnings.

## Overview

The signing process is handled by `electron/sign.js`, which supports two signing methods:
1. **Local Certificate Signing** - Using a `.pfx` or `.p12` certificate file
2. **Azure Key Vault Signing** - Using certificates stored in Azure Key Vault (recommended for CI/CD)

## Setup

### Option 1: Local Certificate Signing

Best for: Local development and testing

1. Obtain a code signing certificate from a trusted Certificate Authority (CA):
   - DigiCert
   - Sectigo
   - GlobalSign
   - Or other trusted CA

2. Export the certificate as a `.pfx` or `.p12` file with private key

3. Add to your `.env.local` (never commit this file!):
   ```bash
   WINDOWS_CERTIFICATE_FILE=C:/path/to/your/certificate.pfx
   WINDOWS_CERTIFICATE_PASSWORD=your_certificate_password
   WINDOWS_TIMESTAMP_URL=http://timestamp.digicert.com  # Optional, default provided
   ```

4. Build your Electron app:
   ```powershell
   npm run electron:build:win
   ```

### Option 2: Azure Key Vault Signing

Best for: CI/CD pipelines and team environments

Azure Key Vault provides secure certificate storage and is recommended for production builds.

1. **Prerequisites:**
   - Azure subscription
   - Code signing certificate uploaded to Azure Key Vault
   - Azure AD service principal with Key Vault access

2. **Azure Setup:**
   ```bash
   # Create service principal
   az ad sp create-for-rbac --name "electron-signing-sp" --role Contributor

   # Grant Key Vault access
   az keyvault set-policy --name YOUR_VAULT_NAME \
     --spn YOUR_CLIENT_ID \
     --certificate-permissions get list \
     --secret-permissions get list
   ```

3. **Environment Variables:**
   Add to your CI/CD environment or `.env.local`:
   ```bash
   AZURE_KEY_VAULT_URI=https://your-vault.vault.azure.net
   AZURE_KEY_VAULT_CERTIFICATE=your-cert-name
   AZURE_KEY_VAULT_CLIENT_ID=your-service-principal-id
   AZURE_KEY_VAULT_CLIENT_SECRET=your-service-principal-secret
   AZURE_KEY_VAULT_TENANT_ID=your-azure-tenant-id
   ```

4. Build:
   ```powershell
   npm run electron:build:win
   ```

## Signing Behavior

- **With valid configuration:** Files will be signed with SHA256 and timestamped
- **Without configuration:** Build will succeed with a warning (unsigned)
- **In CI environment:** Build will fail if signing fails
- **In local development:** Build will continue with warning if signing fails

## Verifying Signed Binaries

After building, verify the signature:

```powershell
# Using signtool (Windows SDK)
signtool verify /pa /v "dist/Starchild Setup.exe"

# Using PowerShell
Get-AuthenticodeSignature "dist/Starchild Setup.exe" | Format-List
```

Expected output should show:
- Status: Valid
- Signature type: Authenticode
- Signer certificate: Your organization name

## Troubleshooting

### "SignTool Error: No certificates were found that met all the given criteria"
- Verify certificate path and password are correct
- Ensure certificate hasn't expired
- Check that certificate is for code signing (Extended Validation Code Signing or Standard Code Signing)

### Azure Key Vault errors
- Verify service principal has correct permissions
- Check that certificate exists in Key Vault
- Ensure all Azure environment variables are set correctly
- Verify Azure CLI is authenticated: `az login`

### "The specified timestamp server either could not be reached"
- Check internet connectivity
- Try alternative timestamp servers:
  - `http://timestamp.digicert.com`
  - `http://timestamp.sectigo.com`
  - `http://timestamp.globalsign.com`

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Build and Sign Windows App

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Build Electron App
        env:
          AZURE_KEY_VAULT_URI: ${{ secrets.AZURE_KEY_VAULT_URI }}
          AZURE_KEY_VAULT_CERTIFICATE: ${{ secrets.AZURE_KEY_VAULT_CERTIFICATE }}
          AZURE_KEY_VAULT_CLIENT_ID: ${{ secrets.AZURE_KEY_VAULT_CLIENT_ID }}
          AZURE_KEY_VAULT_CLIENT_SECRET: ${{ secrets.AZURE_KEY_VAULT_CLIENT_SECRET }}
          AZURE_KEY_VAULT_TENANT_ID: ${{ secrets.AZURE_KEY_VAULT_TENANT_ID }}
          CI: true
        run: npm run electron:build:win

      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: windows-installer
          path: dist/*.exe
```

## Security Best Practices

1. **Never commit certificates or passwords** to version control
2. **Use Azure Key Vault** for production builds
3. **Rotate certificates** before expiration
4. **Use secrets management** in CI/CD (GitHub Secrets, Azure Key Vault, etc.)
5. **Limit certificate access** to only necessary team members
6. **Enable timestamping** to ensure signatures remain valid after certificate expiration

## Cost Considerations

- **Code Signing Certificate:** $50-400/year depending on CA and type (EV vs Standard)
- **Azure Key Vault:** ~$0.03 per 10,000 operations (very low cost for signing)
- **Hardware Security Module (HSM):** Required for EV certificates, included with Azure Key Vault Premium tier

## Resources

- [@electron/windows-sign Documentation](https://github.com/electron/windows-sign)
- [Electron Code Signing](https://www.electronjs.org/docs/latest/tutorial/code-signing)
- [Microsoft Authenticode](https://docs.microsoft.com/en-us/windows-hardware/drivers/install/authenticode)
- [Azure Key Vault](https://docs.microsoft.com/en-us/azure/key-vault/)
