<script>
    import { sectionId, location, userId } from './stores'
    import { ROUTES } from './routes'
    import { set } from './storage'

    const promise = getSections()

    async function getSections() {
        const response = await fetch(`http://localhost:3031/ext/sections/${$userId}`)

        if (response.ok) {
            return await response.json()
        } else {
            throw new Error(response)
        }
    }

    function _clickHandler(id) {
        return async () => {
            await set({ sectionId: id })
            sectionId.set(id)
            location.navigate(ROUTES.picker)
        }
    }
</script>

{#await promise}
    <p>Loading...</p>
{:then { sections }}
    <ul>
    {#each sections as { name, id } (id)}
        <li><button on:click={_clickHandler(id)}>{name}</button></li>
    {/each}
    </ul>
{:catch error}
    <p>Error: {JSON.stringify(error, null, 2)}</p>
{/await}
