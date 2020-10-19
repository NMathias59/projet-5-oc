<?php


namespace App\Events;

use App\Entity\Post;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Security;


class PostUsersSubscriber implements EventSubscriberInterface
{

    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents:: VIEW => ['setPostForCustomer', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setPostForCustomer(ViewEvent $event):void {
        $post = $event->getControllerResult();

        $method = $event->getRequest()->getMethod();

        if($post instanceof Post && $method === 'POST') {
            $user = $this->security->getUser();
            $post->setAuthor($user);
        }
    }

}