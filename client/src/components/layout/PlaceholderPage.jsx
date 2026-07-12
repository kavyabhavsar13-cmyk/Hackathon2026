import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/card';

export function PlaceholderPage({ title, description, breadcrumbs, icon: Icon }) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title={title} description={description} breadcrumbs={breadcrumbs} />
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          {Icon && (
            <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Icon className="size-6" />
            </div>
          )}
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-foreground">This page is ready for backend integration</p>
            <p className="text-sm text-muted-foreground">{title} data and actions will appear here once the API is connected.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
