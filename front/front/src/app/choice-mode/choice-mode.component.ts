import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineController, LineElement, PointElement } from 'chart.js';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

import * as Plotly from 'plotly.js-dist';

@Component({
  selector: 'app-choice-mode',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './choice-mode.component.html',
  styleUrl: './choice-mode.component.css'
})
export class ChoiceModeComponent {
  private myChart: ChartJS | null = null;
  pointsForm!: FormGroup;
  countForm!: FormGroup;
  public ans = "";
  public data: any = {};
  public data2: any[] = [];
  public numbers: number[] = []//,4,5,6,7,8,9,10,11,12]
  public flag: boolean = false;
  constructor(private http: HttpClient) {
    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineController, LineElement, PointElement);
  }


  onSubmitCount() {

   const httpOptions = {
      responseType: 'text' as 'json' // This line tells Angular to expect text response
   };

   this.http.post<any>("http://localhost:8080/app-controller/points", this.countForm.value).subscribe(
      data => {
          this.data = data;
          this.paint();
      },
      error => {
        console.error('There was an error!', error);
      }
   );
   this.flag = true;
  }

  ngOnInit() {
    this.countForm = new FormGroup({});
    this.countForm.addControl("chooseInput1", new FormControl('', [Validators.required, Validators.min(1), Validators.max(3), Validators.pattern(/^\d+$/)]));
    this.countForm.addControl("chooseInput2", new FormControl('', [Validators.required, Validators.min(1), Validators.max(3), Validators.pattern(/^\d+$/)]));
    this.countForm.addControl("x0", new FormControl('', [Validators.required]));
    this.countForm.addControl("xn", new FormControl('', [Validators.required, this.mustBeGreaterThan('x0')]));
    this.countForm.addControl("y0", new FormControl('', [Validators.required]));
    this.countForm.addControl("accuracy", new FormControl('', [Validators.required, Validators.min(0.001)]));
    this.countForm.addControl("countInput", new FormControl('', [Validators.required, Validators.min(2), Validators.max(100), Validators.pattern(/^\d+$/)]));
    this.countForm.get('x0')?.valueChanges.subscribe(() => {
        // Проверяем, что X0 имеет значение, прежде чем обновлять Xn
        if (this.countForm.get('x0')?.value) {
          // Обновляем валидацию для Xn
          this.countForm.get('xn')?.updateValueAndValidity();
        }
      });
  }

  mustBeGreaterThan(controlName: string): (control: any) => ValidationErrors | null {
    return (control: any): ValidationErrors | null => {
      const controlValue = control.value;
      const otherControl = this.countForm.get(controlName);
      if (!otherControl) return null;

      const otherControlValue = otherControl.value;
      return controlValue <= otherControlValue? { mustBeGreaterThan: true } : null;
    };
  }

  paint() {
    const maxValStr = Math.max(...this.data["x"].map(String));
    const minValStr = Math.min(...this.data["x"].map(String));
    const maxVal = Number(maxValStr);
    const minVal = Number(minValStr);
    const chooseInput1Value = this.countForm.get('chooseInput1')?.value;
    const xValues = Array.from({ length: 100 }, (_, i) => (minVal - 1 + i) * (maxVal - minVal + 2) / 99); // Создаем массив из 100 элементов от 0 до 2
    let yValues;
    if (chooseInput1Value === 1) {
      yValues = xValues.map(x => Math.exp(x) - x - 1);
    }
    if (chooseInput1Value === 2) {
      yValues = xValues;
    }
    if (chooseInput1Value === 3) {
      yValues = xValues.map(x => Math.sin(x));
    }
    const trace1 = {
        x: this.data["x"],
        y: this.data["y"],
        mode: 'markers',
        name: "points",
        type: 'scatter'
      };

    const trace2 = {
      x: xValues,
      y: yValues,
      mode: 'lines',
      name: 'y=f(x)',
      type: 'scatter'
    };
    let dataGraph = [trace1, trace2];
    const layout = {
      title: 'Зада Коши',
      showlegend: true,
      legend: { orientation: 'h' }
    };

    Plotly.newPlot('myDiv', dataGraph, layout);
  }

}
