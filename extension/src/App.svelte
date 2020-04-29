<script>
	import { onMount } from 'svelte'
	import Classes from './Classes.svelte'
	import LogIn from './LogIn.svelte'
	import Picker from './Picker.svelte'
	import { ROUTES } from './routes'
	import { currentIndex, currentList, location, userId } from './stores'
	import { get } from './storage'

	const router = {
		[ROUTES.classes]: Classes,
		[ROUTES.login]: LogIn,
		[ROUTES.picker]: Picker,
	}

	onMount(async () => {
		const result = await get(['currentIndex', 'currentList', 'userId'])

		// Hydrate store with values from storage
		if (result.currentIndex) currentIndex.set(result.currentIndex)
		if (result.currentList) currentList.set(result.currentList)
		if (result.userId) userId.set(result.userId)

		// If there are stored values for index and list, then the user
		// was previously in the picker mode. Send them back.
		if (result.currentIndex && result.currentList) {
			location.navigate(ROUTES.picker)
		// If they are logged in, send them to the classes page.
		} else if (result.userId) {
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