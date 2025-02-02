const apiURL = process.env.REACHGOALS_URL || 'http://localhost:5000'

export const addMeta = async (meta) => {
    console.log('META RECEIVED - ', meta)

    try {
        const response = await fetch(`${apiURL}/api/meta/actions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(meta)
        })  

        if (!response.ok) {
            const error  = await response.json()
            throw new Error(error.error || 'Failed to add meta.')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error adding meta: ', error.message)
        throw error
    }
}

export const updateMeta = async (meta) => {
    try {
        const url = `${apiURL}/api/meta/actions/${meta.id}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(meta)
        })  

        if (!response.ok) {
            const error  = await response.json()
            throw new Error(error.error || 'Failed to add meta.')
        }
    } catch (error) {
        console.error('Error update meta: ', error.message)
        throw error
    }
}

export const deleteMeta = async (id) => {
    try {
        const url = `${apiURL}/api/meta/actions/${id}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })  

        if (!response.ok) {
            const error  = await response.json()
            throw new Error(error.error || 'Failed to delete meta.')
        }
    } catch (error) {
        console.error('Error delete meta: ', error.message)
        throw error
    }
}

export const getMeta = async (id) => {
    try {
        const url = id ? `${apiURL}/api/meta/actions/${id}` : `${apiURL}/api/meta/actions`
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })  

        if (!response.ok) {
            const error  = await response.json()
            throw new Error(error.error || 'Failed to fetch metas.')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error get meta: ', error.message)
        throw error
    }
}