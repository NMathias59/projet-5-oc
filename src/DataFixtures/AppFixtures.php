<?php

namespace App\DataFixtures;

use App\Entity\Comment;
use App\Entity\Post;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{


    /**
     * @var UserPasswordEncoderInterface
     */
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;

    }

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');

        for ($u = 1; $u < 40; $u++) {
            $user = new User();

            $hash = $this->encoder->encodePassword($user, "password");

            $user->setName($faker->name())
                ->setEmail($faker->email)
                ->setPassword($hash)
                ->setRoles([])
                ->setBan(false);

            $manager->persist($user);

            $maximum = mt_rand(2, 10);

            $category = array_rand(["SMPHONE", "PC"]);


            for ($p = 1; $p <= $maximum; $p++) {
                $post = new Post();
                $post->setTitle($faker->sentence())
                    ->setContent($faker->text(50))
                    ->setCreatedAt($faker->dateTimeBetween('-6 months'))
                    ->setAuthor($user)
                    ->setCategory("SMPHONE");

                $manager->persist($post);

                for ($c = 1; $p <= $maximum; $p++) {
                    $comment = new Comment();
                    $comment->setContent($faker->text(20))
                        ->setRepport($faker->boolean())
                        ->setPost($post)
                        ->setUser($user)
                        ->setCreatedAt($faker->dateTimeBetween('-6 months'));

                    $manager->persist($comment);
                }
            }
        }



        $manager->flush();
    }
}
