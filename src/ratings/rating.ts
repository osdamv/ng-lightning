import {Component, Input, ChangeDetectionStrategy, Output, EventEmitter, HostListener, HostBinding, ContentChild} from '@angular/core';
import {NglRatingIconTemplate} from './icons';
import {toBoolean} from '../util/util';

@Component({
  selector: 'ngl-rating',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './rating.jade',
  host: {
    'style': 'white-space: nowrap;',
    'tabindex': '0',
    'aria-valuemin': '0',
    '[attr.aria-valuemax]': 'max',
  },
})
export class NglRating {

  range: number[] = [];
  currentRate: number;

  @Input() icon = 'favorite';
  @Input() size: 'x-small' | 'small' | 'large';
  @Input() set isReadonly(readonly: any) {
    this.readonly = toBoolean(readonly);
  }
  @Input() set rate(rate: number) {
    this.inputRate = rate;
    this.currentRate = rate;
  }

  @ContentChild(NglRatingIconTemplate) iconTemplate: NglRatingIconTemplate;

  @Input() set max(max: number | string) {
    this._max = +max;
    this.setRange();
  }
  get max() {
    return this._max;
  }

  private _max: number = 5;
  private readonly = false;
  private inputRate: number;

  @Output() private rateChange = new EventEmitter<number>();
  @Output() private hover = new EventEmitter<number>();

  ngOnInit() {
    this.setRange();
  }

  update(value: number) {
    if (value < 1 || value > this.max || this.readonly || value === this.inputRate) return;
    this.rateChange.emit(value);
  }

  enter(value: number): void {
    if (this.readonly) return;

    this.currentRate = value;
    this.hover.emit(value);
  }

  @HostListener('mouseleave') reset() {
    this.currentRate = this.inputRate;
  }

  // Keyboard interactions
  @HostListener('keydown.ArrowUp', ['$event'])
  @HostListener('keydown.ArrowRight', ['$event'])
  keyboardIncrease(evt: KeyboardEvent) {
    evt.preventDefault();
    this.update(this.inputRate + 1);
  }

  @HostListener('keydown.ArrowDown', ['$event'])
  @HostListener('keydown.ArrowLeft', ['$event'])
  keyboardDecrease(evt: KeyboardEvent) {
    evt.preventDefault();
    this.update(this.inputRate - 1);
  }

  // ARIA
  @HostBinding('attr.aria-valuenow') get ariaValuenow() {
    return this.inputRate;
  }

  private setRange() {
    this.range = Array.apply(null, {length: this.max}).map((value: any, index: number) => index + 1);
  }
};
