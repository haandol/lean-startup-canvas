import * as _ from 'lodash'

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
  title: string
  sections: Section[]
}

const emptyBoard: Board = {
  dirty: false,
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
      title: 'Unique Value Proposition',
      description: 'single, clear, compelling message that turns on unaware visitor into an interested prospect',
      items: [],
      subsection: {
        title: 'High level concept',
        items: [],
      },
    },
    {
      id: 5,
      title: 'Unfair Advantage',
      description: 'something that can not be easily copied or bought',
      items: [],
    },
    {
      id: 6,
      title: 'Channel',
      description: 'launch date and list your path to customers',
      items: [],
    },
    {
      id: 7,
      title: 'Customer Segments',
      description: 'list your target customers and users',
      items: [],
      subsection: {
        title: 'Early Adopters',
        items: [],
      },
    },
  ],
}

export const useBoardStore = defineStore(
  'board',
  () => {
    const board = ref<Board>(_.cloneDeep(emptyBoard))

    function init() {
      board.value = _.cloneDeep(emptyBoard)
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
