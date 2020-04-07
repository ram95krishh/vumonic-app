import React, { Component } from 'react'
import PropTypes from 'prop-types'

class DeferRender extends Component {
  state = { isReady: false }

  componentDidMount () {
    this.animationRequestId = requestAnimationFrame(() => {
      this.setState({ isReady: true })
    })
  }

  componentWillUnmount () {
    cancelAnimationFrame(this.animationRequestId)
  }

  renderDefaultPlaceholder = () => {
    return null
  }

  render () {
    const { isReady } = this.state
    const { children, renderPlaceholder } = this.props

    if (isReady) {
      return children
    }

    if (typeof renderPlaceholder !== 'function') {
      return this.renderDefaultPlaceholder()
    }

    return renderPlaceholder()
  }
}

DeferRender.propTypes = {
  children: PropTypes.element.isRequired,
  renderPlaceholder: PropTypes.func
}

export default DeferRender
