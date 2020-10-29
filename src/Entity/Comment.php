<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CommentRepository;
use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=CommentRepository::class)
 * @ApiResource(normalizationContext={"groups"={"Comment_read"}}, denormalizationContext={"groups"={"Comment_read"}})
 */
class Comment
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"Comment_read", "Post_read"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Post::class, inversedBy="comments")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"Comment_read","Post_read"})
     *
     */
    private $post;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="comments")
     * @Groups({"Comment_read","User_read", "Post_read"})
     */
    private $user;

    /**
     * @ORM\Column(type="text")
     * @Groups({"Comment_read", "Post_read"})
     * @Assert\NotBlank(message="Veuillez ecrire votre commentaire")
     */
    private $content;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"Comment_read", "Post_read"})
     * @Assert\NotBlank(message="renseignez la date")
     * @var DateTime
     */
    private $createdAt;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"Comment_read"})
     * @Assert\NotBlank(message="!!!report ? !!!")
     */
    private $repport;

    public function __construct(){
        $this->createdAt = new DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPost(): ?Post
    {
        return $this->post;
    }

    public function setPost(?Post $post): self
    {
        $this->post = $post;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getRepport(): ?bool
    {
        return $this->repport;
    }

    public function setRepport(bool $repport): self
    {
        $this->repport = $repport;

        return $this;
    }
}
