import { test, expect } from '@playwright/test';

test.describe('Módulo de Autenticación', () => {

    // HOOK: Se ejecuta antes de CADA uno de los tests de abajo
    test.beforeEach(async ({ page }) => {
        // Centralizamos la navegación. Ya no se repite en cada test.
        await page.goto('https://the-internet.herokuapp.com/login');
    });

    test('Debería iniciar sesión exitosamente con credenciales válidas', async ({ page }) => {
        await page.locator('#username').fill('tomsmith');
        await page.locator('#password').fill('SuperSecretPassword!');
        await page.locator('button[type="submit"]').click();

        // Validaciones del camino feliz
        await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');
        
        const successMessage = page.locator('#flash');
        await expect(successMessage).toBeVisible();
        await expect(successMessage).toContainText('You logged into a secure area!');
    });

    test('Debería mostrar un mensaje de error con credenciales inválidas', async ({ page }) => {
        // Forzamos el error con un usuario que no existe
        await page.locator('#username').fill('diego_qa_invalido');
        await page.locator('#password').fill('Cualquiera123!');
        await page.locator('button[type="submit"]').click();

        // VALIDACIONES DEL ESCENARIO NEGATIVO:
        // 1. La URL NO debe cambiar, se tiene que quedar en la página de login
        await expect(page).toHaveURL('https://the-internet.herokuapp.com/login');

        // 2. El cartel de error debe ser visible y contener el texto de falla
        const errorMessage = page.locator('#flash');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Your username is invalid!');
    });

});