<script>
    import { location } from './stores'
    import { ROUTES } from './routes'
    import { get, set } from './storage'

    const promise = getSections()

    async function getSections() {
        const { userId } = await get(['userId'])
        const response = await fetch(`http://localhost:3031/ext/sections/${userId}`)

        if (response.ok) {
            return await response.json()
        } else {
            throw new Error(response)
        }
    }

    function _clickHandler(section) {
        return async () => {
            await set({ section })
            location.navigate(ROUTES.section)
        }
    }
</script>

{#await promise}
    <p>Loading...</p>
{:then { sections }}
    <ul>
    {#each sections as section (section.id)}
        <li><button on:click={_clickHandler(section)}>{section.name}</button></li>
    {/each}
    </ul>
{:catch error}
    <p>Error: {JSON.stringify(error, null, 2)}</p>
{/await}
