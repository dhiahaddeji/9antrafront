import { Component, HostListener, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'The-bridge';

  // Upload feedback state
  uploadToast: { visible: boolean; message: string; type: 'file' | 'drag' } = {
    visible: false, message: '', type: 'file'
  };
  dragActive = false;

  private toastTimer: any;
  private dragCounter = 0;

  // ── File input change (any input[type=file] in the whole app) ──
  @HostListener('document:change', ['$event'])
  onDocumentChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.type !== 'file') return;
    const files = input.files;
    if (!files || files.length === 0) return;

    const names = Array.from(files).map(f => f.name).join(', ');
    const count = files.length;
    const isMedia = Array.from(files).some(f => f.type.startsWith('image/') || f.type.startsWith('video/'));
    const icon = isMedia ? (files[0].type.startsWith('video/') ? '🎬' : '🖼️') : '📁';
    this.showToast(`${icon} ${count > 1 ? count + ' fichiers sélectionnés' : names}`, 'file');
  }

  // ── Drag enter (files dragged over the page) ──
  @HostListener('document:dragenter', ['$event'])
  onDragEnter(event: DragEvent) {
    if (!this.hasFiles(event)) return;
    event.preventDefault();
    this.dragCounter++;
    this.dragActive = true;
  }

  @HostListener('document:dragover', ['$event'])
  onDragOver(event: DragEvent) {
    if (!this.hasFiles(event)) return;
    event.preventDefault();
  }

  @HostListener('document:dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    if (!this.hasFiles(event)) return;
    this.dragCounter--;
    if (this.dragCounter <= 0) { this.dragCounter = 0; this.dragActive = false; }
  }

  @HostListener('document:drop', ['$event'])
  onDrop(event: DragEvent) {
    this.dragCounter = 0;
    this.dragActive = false;
    const files = event.dataTransfer?.files;
    if (!files || files.length === 0) return;
    const names = Array.from(files).map(f => f.name).join(', ');
    const count = files.length;
    const isVideo = Array.from(files).some(f => f.type.startsWith('video/'));
    const isImage = Array.from(files).some(f => f.type.startsWith('image/'));
    const icon = isVideo ? '🎬' : isImage ? '🖼️' : '📁';
    this.showToast(`${icon} ${count > 1 ? count + ' fichiers déposés' : names}`, 'drag');
  }

  private hasFiles(event: DragEvent): boolean {
    return !!(event.dataTransfer?.types?.includes('Files'));
  }

  private showToast(message: string, type: 'file' | 'drag') {
    clearTimeout(this.toastTimer);
    this.uploadToast = { visible: true, message, type };
    this.toastTimer = setTimeout(() => { this.uploadToast.visible = false; }, 3500);
  }

  ngOnDestroy() { clearTimeout(this.toastTimer); }
}
