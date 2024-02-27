import _cloneDeep from 'lodash/cloneDeep'

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
    const board = ref<Board>(_cloneDeep(emptyBoard))

    function init() {
      board.value = _cloneDeep(emptyBoard)
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
      /*
      const { data } = await useFetch<{ data: Board }>('/api/loader', {
        query: { key },
      })
      if (data.value === null) {
        console.error('Error loading board')
        return
      }
      */
      const data = {
        dirty: true,
        title: 'ComposeBold-V1',
        sections: [
          {
            id: 1,
            title: 'Problems',
            description: 'list customers top 3 problems to solve in the production',
            items: ['영어일기를 쓰고 싶은데 무엇을 써야할지 내용이 막막하다', '직군별로 내가 자주 쓰는 표현들을 많이 배울 수 있으면 좋겠다'],
            subsection: {
              title: 'Exsiting Alternatives',
              items: ['영어일기 서비스'],
            },
          },
          {
            id: 2,
            title: 'Solutions',
            description: 'outline a possible solution for each problem',
            items: ['직업에 맞춰 매일 하나씩 작문할 문장을 제공하는 사이트'],
          },
          {
            id: 3,
            title: 'Key Metrics',
            description: 'list the key numbers that tell you how your problem is being solved',
            items: ['리텐션', '매일 작문하는 문장 개수', '매일 작문하는 사람수'],
          },
          {
            id: 4,
            title: 'Unique Value Proposition',
            description: 'single, clear, compelling message that turns on unaware visitor into an interested prospect',
            items: ['직장인을 위한 매일 영어작문 서비스'],
            subsection: {
              title: 'High level concept',
              items: ['작문 연습기능이 추가된 네이버 사전'],
            },
          },
          {
            id: 5,
            title: 'Unfair Advantage',
            description: 'something that can not be easily copied or bought',
            items: ['사용자의 직업과 수준에 맞춰 작문할 문장을 제공한다', '직업과 수준에 맞춰 읽을만한 아티클을 추천해준다'],
          },
          {
            id: 6,
            title: 'Channel',
            description: 'launch date and list your path to customers',
            items: ['개발자 커뮤니티에 홍보', '직장인 영어 커뮤니티에 홍보'],
          },
          {
            id: 7,
            title: 'Customer Segments',
            description: 'list your target customers and users',
            items: ['영어를 배우고 싶은 직장인'],
            subsection: {
              title: 'Early Adopters',
              items: ['영어를 배우고 싶은 개발자'],
            },
          },
        ],
      }
      board.value = data
      board.value.dirty = false
    }

    function updateTitle(title: string) {
      board.value.title = title
    }

    return { board, init, fetch, fromJSON, updateTitle }
  },
  { persist: true }
)
