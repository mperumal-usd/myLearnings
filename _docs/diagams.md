


<div class="mermaid">
graph TD
  A[Input] --> B(Validate)
  B --> C{Valid}
  C -- Yes --> D[Calculate]
  C -- No --> E[Show Error]
  D --> F[Display Results]
  E --> F
</div>
