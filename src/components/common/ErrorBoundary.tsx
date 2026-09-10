import { Component, type ReactNode } from 'react';

interface Props { fallback: ReactNode; children: ReactNode }
interface State { failed: boolean }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.warn('[brainlift] scene failed, using static visual:', error);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
