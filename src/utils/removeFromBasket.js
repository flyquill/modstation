export async function removeFromBasket(packageId, basketIdent, token) {
    if (!packageId || !basketIdent) {
        console.error('Missing package_id or basket_ident');
        return { success: false, error: 'Missing data' };
    }

    const url = `https://headless.tebex.io/api/baskets/${basketIdent}/packages/remove`;

    const payload = JSON.stringify({ package_id: Number(packageId) });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'X-Tebex-Secret': token
            },
            body: payload
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to remove package:', errorData);
            return { success: false, error: errorData };
        }

        return { success: true, package_id: packageId };
    } catch (error) {
        console.error('Request error:', error);
        return { success: false, error };
    }
}
