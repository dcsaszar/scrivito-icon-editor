import { useId, useState } from 'react'

export function IconPicker({
  defaultValue,
  disabled,
  icons,
  onChange,
  renderFunc,
  showClearButton,
  value,
}: {
  defaultValue?: string
  disabled?: boolean
  icons: string[]
  onChange: (value: string | undefined) => void
  renderFunc: (value?: string) => JSX.Element
  showClearButton?: boolean
  value?: string
}) {
  const [matchingIcons, setMatchingIcons] = useState(icons)
  const inputId = useId()
  const searchLabel = 'Search'
  const activeIcon = value || defaultValue

  return (
    <div className="icon-picker">
      <label
        aria-label={disabled ? undefined : searchLabel}
        className="icon-preview"
        htmlFor={inputId}
        title={activeIcon}
      >
        {renderFunc(activeIcon)}
      </label>
      {!disabled && !defaultValue && showClearButton && value && (
        <button className="icon-clear" onClick={() => onChange(undefined)}>
          ❌
        </button>
      )}
      {!disabled && (
        <div className="icon-dialog">
          <label className="icon-search" aria-label={searchLabel}>
            <input
              id={inputId}
              onChange={(e) => search(e.target.value.trim().split(/\s+/))}
              placeholder={activeIcon || ''}
              type="search"
            />
          </label>
          <div className="icon-select">
            {matchingIcons.map((icon) => (
              <button
                className={icon === activeIcon ? 'active' : undefined}
                key={icon}
                onClick={() => onChange(icon)}
                title={icon}
              >
                {renderFunc(icon)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  function search(terms: string[]) {
    setMatchingIcons(
      icons.filter((icon) => terms.every((term) => icon.includes(term))),
    )
  }
}
