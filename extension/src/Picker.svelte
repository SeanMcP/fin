<script>
    import { currentSectionId, currentIndex, currentList } from './stores'

    async function getStudents() {
        const response = await fetch(`http://localhost:3031/ext/students/section/${$currentSectionId}`)

        if (response.ok) {
            const { students } = await response.json()
            currentList.set(students)
            return Promise.resolve(true)
        } else {
            return new Error('Error fetching students')
        }
    }

    const promise = getStudents()
</script>

{#await promise}
    <p>Loading...</p>
{:then}
    <p>{$currentList[$currentIndex].name}</p>
    <div class="button-container">
        <button on:click={currentIndex.decrement}>Back</button>
        <button on:click={currentIndex.increment}>Next</button>
    </div>
{:catch error}
    <p>Error: {JSON.stringify(error, null, 2)}</p>
{/await}

<style>
    .button-container {
        display: flex;
        justify-content: space-between;
    }
</style>