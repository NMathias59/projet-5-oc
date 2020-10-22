<?php


namespace App\Events;

use App\Entity\Comment;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Security;


class CommentUserPost implements EventSubscriberInterface
{

    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents:: VIEW => ['setCommentForCustomer', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setCommentForCustomer(ViewEvent $event):void {
        $comment = $event->getControllerResult();

        $method = $event->getRequest()->getMethod();

        if($comment instanceof Comment && $method === 'POST') {
            $user = $this->security->getUser();
            $comment->setUser($user);
        }
    }

}