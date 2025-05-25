import {forwardRef, useImperativeHandle, useState} from "react";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export interface YoutubeDialogHandle {
    open: () => Promise<string | null>;
}

interface YoutubeDialogProps {
    onSubmit?: (url: string) => void;
}

const YoutubeDialog = forwardRef<YoutubeDialogHandle, YoutubeDialogProps>(({ onSubmit }, ref) => {
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState("");
    const [resolver, setResolver] = useState<(value: string | null) => void>(() => () => {
    });

    useImperativeHandle(ref, () => ({
        open: () => {
            setOpen(true);
            setUrl("");
            return new Promise((resolve) => {
                setResolver(() => resolve);
            });
        },
    }));

    const handleSelect = () => {
        setOpen(false);
        if (onSubmit) {
            onSubmit(url);
            resolver(url || null);
        } else {
            resolver(url || null);
        }
    };

    const handleClose = () => {
        setOpen(false);
        resolver(null);
    };

    return (
        <Dialog open={open} onOpenChange={(v) => {
            if (!v) handleClose();
        }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enter YouTube URL</DialogTitle>
                </DialogHeader>
                <Input
                    placeholder="https://youtube.com/watch?v=..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <DialogFooter>
                    <Button onClick={handleSelect} disabled={!url}>Insert</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
});

YoutubeDialog.displayName = "YoutubeDialog";

export {YoutubeDialog};
