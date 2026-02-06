import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactService, AirbnbListing } from './fact.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private listingService = inject(FactService);

  protected readonly listings = signal<AirbnbListing[]>([]);
  protected readonly isLoading = signal<boolean>(false);
  protected readonly isMoreLoading = signal<boolean>(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly currentPage = signal<number>(1);
  protected readonly hasMore = signal<boolean>(true);

  ngOnInit() {
    this.loadListings();
  }

  protected loadListings() {
    console.log('App: loadListings started');
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.currentPage.set(1);

    this.listingService.getListings(1)
      .pipe(finalize(() => {
        console.log('App: loadListings finalized');
        this.isLoading.set(false);
      }))
      .subscribe({
        next: (response) => {
          console.log('App: loadListings success', response.listings.length);
          this.listings.set(response.listings);
          this.hasMore.set(response.listings.length > 0);
        },
        error: (err) => {
          console.error('Error fetching listings:', err);
          this.errorMessage.set('Failed to fetch listings. Please ensure the backend is running at http://127.0.0.1:8000');
        }
      });
  }

  protected loadMore() {
    if (this.isMoreLoading() || !this.hasMore()) return;

    this.isMoreLoading.set(true);
    const nextPage = this.currentPage() + 1;

    this.listingService.getListings(nextPage)
      .pipe(finalize(() => this.isMoreLoading.set(false)))
      .subscribe({
        next: (response) => {
          if (response.listings.length > 0) {
            this.listings.update(current => [...current, ...response.listings]);
            this.currentPage.set(nextPage);
          } else {
            this.hasMore.set(false);
          }
        },
        error: (err) => {
          console.error('Error loading more listings:', err);
        }
      });
  }

  protected refresh() {
    window.location.reload();
  }
}
