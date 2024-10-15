import type { Widget, Obj } from 'scrivito'
import { uiContext, canEdit, connect } from 'scrivito'
import { BootstrapIconPicker } from './BootstrapIconPicker.js'
import './ScrivitoIconEditor.css'

export function ScrivitoBootstrapIconEditor(
  props: PropertiesGroupProps,
): JSX.Element {
  return <IconPropertiesGroupComponent {...props} />
}

export function getScrivitoBootstrapIconEditor(iconEditorProps: {
  attribute?: string
  defaultValue?: string
  description?: string
  previewTitle?: string
  showClearButton?: boolean
}): (props: PropertiesGroupProps) => JSX.Element {
  return function ScrivitoBootstrapIconEditor(props: PropertiesGroupProps) {
    return <IconPropertiesGroupComponent {...iconEditorProps} {...props} />
  }
}

type PropertiesGroupProps =
  | { obj?: never; widget: Widget }
  | { obj: Obj; widget?: never }

const IconPropertiesGroupComponent = connect(
  function IconPropertiesGroupComponent({
    attribute,
    description,
    obj,
    previewTitle,
    widget,
    ...props
  }: PropertiesGroupProps & {
    attribute?: string
    defaultValue?: string
    description?: string
    previewTitle?: string
    showClearButton?: boolean
  }) {
    const attributeName = attribute || 'icon'
    const content = obj || widget
    const value = content.get(attributeName)
    const theme = uiContext()?.theme

    return theme ? (
      <div
        className={`scrivito_${theme} scrivito_detail_content scrivito-icon-editor`}
      >
        <div className="scrivito_notice_body">{description}</div>
        <div className="scrivito_detail_label">
          <span>{previewTitle ?? 'Preview'}</span>
        </div>
        <BootstrapIconPicker
          disabled={!canEdit(obj || widget.obj())}
          onChange={(name) =>
            content.update({ [attributeName]: name ? `bi-${name}` : '' })
          }
          value={
            typeof value === 'string' ? value.replace(/^bi-/, '') : undefined
          }
          {...props}
        />
      </div>
    ) : null
  },
)
