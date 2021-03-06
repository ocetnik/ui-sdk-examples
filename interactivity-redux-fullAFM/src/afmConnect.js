// Copyright (C) 2007-2017, GoodData(R) Corporation. All rights reserved.
import { connect } from 'react-redux'
import {
  setMeasures,
  addMeasure,
  removeMeasures,
  updateAttributeFilter,
  removeAttributeFilter
} from './actions/afm'

/**
 * Transforms { label => definitions } hash of filters
 * into an array of filters as defined at
 * https://confluence.intgdc.com/display/VS/AFM#AFM-AttributeFilter
 */
const toAfmFilters = (filtersHash) => {
  if (filtersHash && (typeof(filtersHash) === "object")) {
    return Object.keys(filtersHash).map(label => ({
      id: label,
      type: "attribute",
      ...filtersHash[label]
    }))
  }
  return []
} 

const mapStateToProps = (state, ownProps) => {
  const { measureGroups, filterGroups } = state
  const { measureGroup, filterGroup } = ownProps
  return {
    measures: measureGroup ? measureGroups[measureGroup] : [],
    filters: filterGroup ? toAfmFilters(filterGroups[filterGroup]) : []
  }
}

export default (component) => (
  connect(
    mapStateToProps,
    { setMeasures, addMeasure, removeMeasures,
      updateAttributeFilter, removeAttributeFilter }
  )(component)
)