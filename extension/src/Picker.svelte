<script>
    import { onMount } from 'svelte'
    import shuffle from 'array-shuffle'
    import { location } from './stores'
    import { set, get, remove } from './storage'
    import { ROUTES } from './routes'

    let index = 0, list = []

    async function handleBack() {
        await remove(['index', 'list'])
        location.navigate(ROUTES.section)
    }

    async function decrement() {
        const body = {}
        let next = index - 1
        if (next <= 0) {
          next = list.length - 1
          body.list = updateList()
        }
        body.index = next
        index = next
        await set(body)
    }

    async function increment() {
        const body = {}
        let next = index + 1
        if (next >= list.length) {
          next = 0
          body.list = updateList()
        }
        body.index = next
        index = next
        await set(body)
    }

    function updateList(array = list) {
        const next = shuffle(array)
        list = next
        return next
    }

    onMount(async () => {
        const result = await get(['index', 'list', 'students'])

        // Progress stored: update local values
        if (result.index != null && result.list) {
            index = result.index
            list = result.list
        // New game: start from scratch
        } else if (result.students) {
            await set({ index, list: updateList(result.students) })
        } else {
            // TODO: Handle this case; navigate?
        }
    })
</script>

<button on:click={handleBack}>Back</button>

{#if list.length > 0}
    <p>{list[index].name}</p>
    <div class="button-container">
        <button on:click={decrement}>Back</button>
        <button on:click={increment}>Next</button>
    </div>
{:else}
    <p>Loading...</p>
{/if}

<style>
    .button-container {
        display: flex;
        justify-content: space-between;
    }
</style>