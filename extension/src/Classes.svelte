<script>
    import { currentClassId, location, userId } from './stores'
    let promise = getClasses()

    async function getClasses() {
        const response = await fetch(`http://localhost:3031/ext/classes/${$userId}`)

        if (response.ok) {
            return await response.json()
        } else {
            throw new Error(response)
        }
    }

    function _clickHandler(id) {
        return () => {
            currentClassId.set(id)
            location.navigate(ROUTES.class)
        }
    }
</script>

{#await promise}
    <p>Loading...</p>
{:then { classes }}
    <ul>
    {#each classes as { name, id } (id)}
        <li><button on:click={_clickHandler(id)}>{name}</button></li>
    {/each}
    </ul>
{:catch error}
    <p>Error: {JSON.stringify(error, null, 2)}</p>
{/await}
