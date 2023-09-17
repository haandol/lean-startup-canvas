type Section = {
  id: number
  title: string
  description: string
  items: string[]
  subsection?: Subsection
}
type Subsection = Pick<Section, 'title' | 'items'>
type Board = {
  dirty?: boolean
  isEmpty?: boolean
  title: string
  sections: Section[]
}

const emptyBoard: Board = {
  dirty: false,
  isEmpty: true,
  title: 'Untitled',
  sections: [
    {
      id: 1,
      title: 'Problems',
      description: 'list customers top 3 problems to solve in the production',
      items: [],
      subsection: {
        title: 'Exsiting Alternatives',
        items: [],
      },
    },
    {
      id: 2,
      title: 'Solutions',
      description: 'outline a possible solution for each problem',
      items: [],
    },
    {
      id: 3,
      title: 'Key Metrics',
      description: 'list the key numbers that tell you how your problem is being solved',
      items: [],
    },
    {
      id: 4,
      title: 'Deliverables',
      description: 'clear message that describe your problem being solved in prototyping engagement',
      items: [],
      subsection: {
        title: 'High level concept',
        items: [],
      },
    },
    {
      id: 5,
      title: 'Business Impacts',
      description: 'list the prospecting changes in the market/business that the deliverables brings in',
      items: [],
    },
    {
      id: 6,
      title: 'Launch Plan',
      description: 'launch date and responsibility and role of the production system',
      items: [],
    },
    {
      id: 7,
      title: 'Personas',
      description: 'list your end-users that involved to the target system',
      items: [],
      subsection: {
        title: 'Participants',
        items: [],
      },
    },
  ],
}

export const useBoardStore = defineStore(
  'board',
  () => {
    const board = ref<Board>(emptyBoard)

    function init() {
      board.value = emptyBoard
    }

    function fromJSON(json?: string) {
      if (!json) {
        console.error('no json data')
        return
      }

      try {
        const data = JSON.parse(json)
        init()
        board.value = data
        board.value.dirty = false
      } catch (err) {
        console.error(err)
        alert('failed to parse JSON')
      }
    }

    async function fetch(key: string) {
      const { data } = await useFetch<{ data: Board }>('/api/loader', {
        query: { key },
      })
      if (data.value === null) {
        console.error('Error loading board')
        return
      }
      board.value = data.value.data
      board.value.dirty = false
    }

    function updateTitle(title: string) {
      board.value.title = title
    }

    return { board, init, fetch, fromJSON, updateTitle }
  },
  { persist: true }
)
