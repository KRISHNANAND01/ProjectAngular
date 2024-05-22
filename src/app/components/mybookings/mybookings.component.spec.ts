import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyBookingsComponent } from './mybookings.component';



describe('MybookingsComponent', () => {
  let component: MyBookingsComponent;
  let fixture: ComponentFixture<MyBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyBookingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
