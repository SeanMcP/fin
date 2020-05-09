<script>
    import { onMount } from 'svelte'
    import shuffle from 'array-shuffle'
    import { sectionId, location } from './stores'
    import { set, get, remove } from './storage'
    import { ROUTES } from './routes'

    let index = 0, list = []

    async function handleBack() {
        await remove(['index', 'list'])
        location.navigate(ROUTES.sections)
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
        const result = await get(['index', 'list'])
        console.debug('result', result)
        if (result.index != null && result.list) {
            index = result.index
            list = result.list
        } else {
            const response = await fetch(`http://localhost:3031/ext/students/section/${$sectionId}`)

            if (response.ok) {
                const { students } = await response.json()
                await set({ index, list: updateList(students) })
            } else {
                console.error('Error fetching students for section', $sectionId)
            }
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