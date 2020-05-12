<script>
    import { onMount } from 'svelte'
    import { location } from './stores'
    import { ROUTES } from './routes'
    import { get, set } from './storage'

    let sectionName = ''

    onMount(async () => {
        const { section: { id, name } } = await get(['section'])
        sectionName = name

        const response = await fetch(`http://localhost:3031/ext/students/section/${id}`)

        if (response.ok) {
            const { students } = await response.json()
            await set({ students })
        } else {
            console.error('Error fetching students for section', id)
        }
    })
</script>

<h2>{sectionName}</h2>
<button on:click={() => location.navigate(ROUTES.picker)}>Picker</button>