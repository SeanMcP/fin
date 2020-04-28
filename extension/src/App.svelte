<script>
	import Classes from './Classes.svelte'
	import LogIn from './LogIn.svelte'
	import Picker from './Picker.svelte'
	import { ROUTES } from './routes'
	import { location, userId } from './stores'

	const router = {
		[ROUTES.classes]: Classes,
		[ROUTES.login]: LogIn,
		[ROUTES.picker]: Picker,
	}

	chrome.storage.sync.get(['userId'], result => {
		// User has previously logged in
		if (result.userId) {
			userId.set(result.userId)
			location.navigate(ROUTES.classes)
		}
	})
</script>

<main>
	<h1>Fin</h1>
	<svelte:component this={router[$location]} />
</main>

<style>
	h1 {
		margin-top: 0;
	}
	main {
		padding: 1em;
	}
</style>