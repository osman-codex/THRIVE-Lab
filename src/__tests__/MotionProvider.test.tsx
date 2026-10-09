import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, cleanup, waitFor } from '@testing-library/react';
import MotionProvider from '@/components/MotionProvider';

type Callback = (entries: { target: Element; isIntersecting: boolean }[]) => void;

class FakeIntersectionObserver {
  static instances: FakeIntersectionObserver[] = [];
  static callbacks = new Map<FakeIntersectionObserver, Callback>();

  constructor(cb: Callback) {
    this.callback = cb;
    FakeIntersectionObserver.instances.push(this);
    FakeIntersectionObserver.callbacks.set(this, cb);
  }
  callback: Callback;
  observed: Element[] = [];
  observe(target: Element) {
    this.observed.push(target);
  }
  unobserve(target: Element) {
    this.observed = this.observed.filter((t) => t !== target);
  }
  disconnect() {
    this.observed = [];
    FakeIntersectionObserver.instances = FakeIntersectionObserver.instances.filter(
      (i) => i !== this,
    );
    FakeIntersectionObserver.callbacks.delete(this);
  }
  takeRecords() {
    return [];
  }
}

function triggerIntersect(observer: FakeIntersectionObserver, target: Element) {
  FakeIntersectionObserver.callbacks
    .get(observer)!
    .call(observer, [{ target, isIntersecting: true }]);
}

describe('MotionProvider', () => {
  const originalIO = window.IntersectionObserver;
  const originalMO = window.MutationObserver;

  beforeEach(() => {
    FakeIntersectionObserver.instances = [];
    FakeIntersectionObserver.callbacks.clear();
    vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver as unknown);
    document.body.innerHTML = '';
    document.documentElement.classList.remove('js');
  });

  afterEach(() => {
    cleanup();
    vi.stubGlobal('IntersectionObserver', originalIO);
    vi.stubGlobal('MutationObserver', originalMO);
    document.body.innerHTML = '';
    document.documentElement.classList.remove('js');
  });

  it('adds the .js class to <html>', () => {
    render(<MotionProvider />);
    expect(document.documentElement.classList.contains('js')).toBe(true);
  });

  it('observes existing [data-animate] elements on mount', () => {
    const section = document.createElement('div');
    section.setAttribute('data-animate', '');
    document.body.appendChild(section);

    render(<MotionProvider />);

    const io = FakeIntersectionObserver.instances[0];
    expect(io.observed).toContain(section);
  });

  it('observes children of [data-animate-group] containers via observer entries, not directly', () => {
    const group = document.createElement('div');
    group.setAttribute('data-animate-group', '');
    const child = document.createElement('p');
    group.appendChild(child);
    document.body.appendChild(group);

    render(<MotionProvider />);

    const io = FakeIntersectionObserver.instances[0];
    // The container is observed, not each child; CSS staggers the children.
    expect(io.observed).toContain(group);
    expect(io.observed).not.toContain(child);
  });

  it('marks elements visible when they intersect', () => {
    const section = document.createElement('div');
    section.setAttribute('data-animate', '');
    document.body.appendChild(section);

    render(<MotionProvider />);

    const io = FakeIntersectionObserver.instances[0];
    triggerIntersect(io, section);
    expect(section.classList.contains('is-visible')).toBe(true);
    expect(io.observed).not.toContain(section); // unobserved after reveal
  });

  it('picks up elements added after mount (client-side navigation)', async () => {
    render(<MotionProvider />);

    // Simulate the router swapping page content.
    const page = document.createElement('main');
    const section = document.createElement('div');
    section.setAttribute('data-animate', '');
    page.appendChild(section);
    document.body.appendChild(page);

    await waitFor(() => {
      const io = FakeIntersectionObserver.instances[0];
      expect(io.observed).toContain(section);
    });
  });

  it('shows everything when IntersectionObserver is unsupported', () => {
    vi.stubGlobal('IntersectionObserver', undefined);

    const section = document.createElement('div');
    section.setAttribute('data-animate', '');
    document.body.appendChild(section);

    render(<MotionProvider />);

    expect(section.classList.contains('is-visible')).toBe(true);
  });

  it('disconnects observers on unmount', () => {
    const section = document.createElement('div');
    section.setAttribute('data-animate', '');
    document.body.appendChild(section);

    const { unmount } = render(<MotionProvider />);
    const io = FakeIntersectionObserver.instances[0];
    expect(io.observed).toContain(section);

    unmount();
    expect(io.observed.length).toBe(0);
  });
});
