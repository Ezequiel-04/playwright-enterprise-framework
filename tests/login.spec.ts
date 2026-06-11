import { test, expect } from '@playwright/test';

test.describe('Módulo de Autenticación', () => {

    test('Debería iniciar sesión exitosamente con credenciales válidas', async ({ page }) => {
        // 1. Navegar a la página de login
        await page.goto('https://the-internet.herokuapp.com/login');

        // 2. Cargar el campo de Usuario (usando selector de ID)
        await page.locator('#username').fill('tomsmith');

        // 3. Cargar el campo de Contraseña (usando selector de ID)
        await page.locator('#password').fill('SuperSecretPassword!');

        // 4. Hacer clic en el botón de ingresar (usando selector de CSS por clase y tag)
        await page.locator('button[type="submit"]').click();

        // 5. Verificación (Assertion): Validar que la URL cambió a la zona segura
        await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');

        // 6. Verificación (Assertion): Validar que el cartel verde de éxito sea visible
        const flashMessage = page.locator('#flash');
        await expect(flashMessage).toBeVisible();
        await expect(flashMessage).toContainText('You logged into a secure area!');
    });

});