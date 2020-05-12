<script>
	import { onMount } from 'svelte'
	import LogIn from './LogIn.svelte'
	import Picker from './Picker.svelte'
	import Section from './Section.svelte'
	import Sections from './Sections.svelte'
	import { ROUTES } from './routes'
	import { location, userId } from './stores'
	import { get } from './storage'

	const router = {
		[ROUTES.login]: LogIn,
		[ROUTES.section]: Section,
		[ROUTES.sections]: Sections,
		[ROUTES.picker]: Picker,
	}

	onMount(async () => {
		const result = await get(['index', 'list', 'section', 'userId'])

		// Hydrate store with values from storage
		if (result.userId) userId.set(result.userId)

		// If there are stored values for index and list, then the user
		// was previously in the picker mode. Send them back.
		if (result.index != null && result.list && result.section) {
			location.navigate(ROUTES.picker)
		// If they are logged in, send them to the sections page.
		} else if (result.userId) {
			location.navigate(ROUTES.sections)
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