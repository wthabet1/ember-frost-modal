import Ember from 'ember'
const {
  assign,
  computed,
  getWithDefault
} = Ember
import FrostModalBinding from '../../frost-modal-binding'
import { message } from '../../../helpers/frost-modal-animation'
import PropTypesMixin, { PropTypes } from 'ember-prop-types'

export default FrostModalBinding.extend(PropTypesMixin, {

  // == State properties ======================================================

  propTypes: {
    // Options
    buttons: PropTypes.array,
    confirm: PropTypes.shape({
      isVisible: PropTypes.bool,
      text: PropTypes.string
    }),
    details: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.EmberObject
    ]),
    footer: PropTypes.string,
    isVisible: PropTypes.bool.isRequired,
    links: PropTypes.array,
    subtitle: PropTypes.string,
    summary: PropTypes.string,
    targetOutlet: PropTypes.string,
    title: PropTypes.string.isRequired,

    // Actions
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func
  },

  getDefaultProps () {
    let defaultProps = this._super()

    assign(defaultProps, {
      animation: message,
      classModifier: 'message',
      modal: 'frost-modal-dialog'
    })

    return defaultProps
  },

  // == Computed properties ===================================================

  params: computed(function () {
    return {
      buttons: this.buttons,
      cancel: {
        isVisible: false
      },
      confirm: {
        isVisible: getWithDefault(this, 'confirm.isVisible', true),
        text: getWithDefault(this, 'confirm.text', 'Ok')
      },
      content: this.details,
      footer: this.footer,
      icon: {
        name: 'info',
        pack: 'frost-modal'
      },
      links: this.links,
      subtitle: this.subtitle,
      summary: this.summary,
      title: this.title
    }
  })

})
