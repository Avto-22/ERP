import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { User } from 'src/app/models/branchs.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  choosedUser!: User;
  @Input() isChoosed!: boolean;

  @Input() user!: User;

  constructor(private renderer: Renderer2) {}
  ngOnInit(): void {
    this.scrollAnimation();
  }

  scrollAnimation() {
    const cards = document.querySelectorAll('.user_card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(entry.target, 'show_card');
          }
        });
      },
      { threshold: 1 }
    );

    cards.forEach((card) => {
      observer.observe(card);
    });
  }
}
