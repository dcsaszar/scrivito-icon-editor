import * as React from 'react'
import * as Scrivito from 'scrivito'

import { AllIcons } from './AllIcons'
import { IconSearch } from './IconSearch'
import { IconSearchResults } from './IconSearchResults'
import { getIconColor } from './getIconColor'
import './IconEditorTab.scss'

export function ScrivitoIconEditor({ widget }: { widget: Scrivito.Widget }) {
  return (
    <SelectBootstrapIcon
      currentIcon={widget.get('icon') as string}
      iconColor={getIconColor(widget)}
      updateIcon={(icon: string) => {
        widget.update({ icon })
      }}
      theme={Scrivito.uiContext()?.theme}
      readonly={!Scrivito.canWrite()}
    />
  )
}

export function SelectBootstrapIcon({
  currentIcon,
  iconColor,
  updateIcon,
  theme,
  readonly,
  description,
}: {
  currentIcon: string
  iconColor?: string
  updateIcon: (newIcon: string) => void
  theme?: 'dark' | 'light'
  readonly?: boolean
  description?: string
}) {
  const [searchValue, setSearchValue] = React.useState('')

  return (
    <div className={`scrivito_${theme ?? 'dark'}`}>
      <div className="neoletter-form-icon-editor-tab">
        <div className="scrivito_notice_body">{description}</div>
        <div className="scrivito_detail_content">
          <div className="scrivito_detail_label">
            <span>Preview</span>
          </div>
          <div className="icon-editor-preview">
            <i className={`bi ${currentIcon}`} style={{ color: iconColor }}></i>
          </div>

          {!readonly && (
            <>
              <IconSearch
                searchValue={searchValue}
                setSearchValue={(newSearchValue) => {
                  if (searchValue !== newSearchValue) {
                    setSearchValue(newSearchValue)
                  }
                }}
              />
              <IconSearchResults
                currentIcon={currentIcon}
                searchValue={searchValue}
                setWidgetIcon={setWidgetIcon}
              />
              <AllIcons
                currentIcon={currentIcon}
                hide={!searchValue}
                setWidgetIcon={setWidgetIcon}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )

  function setWidgetIcon(event: React.BaseSyntheticEvent, icon: string): void {
    event.preventDefault()
    event.stopPropagation()
    updateIcon(icon)
  }
}
