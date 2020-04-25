<script>
	import Classes from './Classes.svelte'
	import LogIn from './LogIn.svelte'
	import { ROUTES } from './routes'

	let userId
	let location = ROUTES.login

	const router = {
		[ROUTES.classes]: Classes,
		[ROUTES.login]: LogIn,
	}
	function navigate(to) {
		location = to
	}
	function setUserId(id) {
		userId = id
	}

	chrome.storage.sync.get(['userId'], result => {
		// User has previously logged in
		if (result.userId) {
			userId = result.userId
			location = ROUTES.classes
		}
	})
</script>

<main>
	<h1>Fin</h1>
	<svelte:component this={router[location]} { navigate } user={[userId, setUserId]} />
</main>

<style>
	h1 {
		margin-top: 0;
	}
	main {
		padding: 1em;
	}
</style>