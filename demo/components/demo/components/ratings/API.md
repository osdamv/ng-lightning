# `<ngl-rating>`

### Input

  * `rate: number`: Current rate.
  * `max?: number = 5`: Maximum rate number.
  * `isReadonly?: boolean = false`: Prevent user's interaction.
  * `icon?: string = 'favorite'`: Icon used to display the available rates.
  * `size?: 'x-small' | 'small' | 'large'`: Icon sizes.

### Output

  * `rateChange: EventEmitter<number>`: the clicked rate
  * `hover: EventEmitter<number>`: the currently hovered rate

# `template[nglRatingIcon]`

### Variables

  * `$implicit: boolean`: Whether icon should be active.
  * `index: number`: Icon index.
