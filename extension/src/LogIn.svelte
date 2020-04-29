<script>
    import { ROUTES } from './routes'
    import { location, userId } from './stores'
    import { set } from './storage'
    let error, email = 'chuck@testa.com', password = 'nope'

    async function logIn() {
        try {
            const response = await fetch('http://localhost:3031/login', { body: JSON.stringify({ email, password }), headers: { 'Content-Type': 'application/json' }, method: 'POST' })
    
            if (response.ok) {
                const { user } = await response.json()
                userId.set(user.id)
                await set({ userId: user.id })
                location.navigate(ROUTES.classes)
            }
        } catch(err) {
            error = 'Uh oh; there was an problem logging in! Try again.'
            console.error('LogIn > logIn', err)
        }
    }

    function dismissError() {
        error = undefined
    }
</script>

<form class:error="{error}" on:submit|preventDefault={logIn}>
    <label for="email">Email</label>
    <input bind:value={email} id="email" on:change={dismissError} />
    <label for="password">Password</label>
    <input bind:value={password} id="password" on:change={dismissError} type="password" />
    <button>Log in</button>
    {#if error}<p>{error}</p>{/if}
</form>

<style>
    form.error {
        background: pink;
    }
    input, label {
        display: block;
    }
</style>