import { Module } from 'vuex'
import { GlobalDataProps, asyncAndCommit } from './index'
import { PageData } from './editor'
import { objToQueryString } from '../helper'
export type WorkProp = Required<Omit<PageData, 'props' | 'setting'>>

export interface WorksProp {
  templates: WorkProp[];
  works: WorkProp[];
}

const workModule: Module<WorksProp, GlobalDataProps> = {
  state: {
    templates: [],
    works: []
  },
  mutations: {
    fetchTemplates (state, { data }) {
      state.templates = [...data.list]
    },
    fetchWorks (state, { data }) {
      console.log(data)
      state.works = [...data.list]
    },
    createWork (state, { data }) {
      console.log(data)
      state.works.unshift(data)
    },
    deleteWork (state, { extraData }) {
      state.works = state.works.filter(work => work.id !== extraData.id)
    }
  },
  actions: {
    fetchTemplates ({ commit }, queryObj = { pageIndex: 1, pageSize: 5 }) {
      const queryString = objToQueryString(queryObj)
      return asyncAndCommit(`/templates?${queryString}`, 'fetchTemplates', commit)
    },
    fetchWorks ({ commit }, queryObj = { pageIndex: 1, pageSize: 5 }) {
      const queryString = objToQueryString(queryObj)
      return asyncAndCommit(`/works?${queryString}`, 'fetchWorks', commit)
    },
    deleteWork ({ commit }, id) {
      return asyncAndCommit(`/works/${id}`, 'deleteWork', commit, { method: 'delete' }, { id })
    },
    createWork ({ commit }, payload: WorkProp) {
      return asyncAndCommit('/works', 'createWork', commit, { method: 'post', data: payload })
    }
  }
}

export default workModule
